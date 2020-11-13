"use strict";
import { deepCopy } from "./modules"; // utils
import { SHA256 } from "./modules"; // crypto
import { db } from "./modules"; // database

class BlockHeader {
    constructor(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce) {
        this.version = version;
        this.index = index;
        this._previousHash = previousHash;
        this.timestamp = timestamp;
        this.merkleRoot = merkleRoot;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }

    get previousHash() {
        return this._previousHash.toUpperCase(); // always return upper case letters.
    }

    /**
     * @param {string} newPreviousHash
     */
    set previousHash(newPreviousHash) {
        this._previousHash = newPreviousHash;
    }

    hash() {
        return SHA256([
            this.version,
            this.index,
            this.previousHash,
            this.timestamp,
            this.merkleRoot,
            this.difficulty,
            this.nonce
        ]);
    }
}

class Block {
    constructor(header, data) {
        this.header = deepCopy(header);
        this.data = deepCopy(data);
    }

    hash() {
        return this.header.hash();
    }

    encode() {
        return JSON.stringify(this);
    }

    decode(encodedBlock) {
        var decodedBlock = JSON.parse(encodedBlock);
        var objectifiedBlock = Object.assign(new Block(), decodedBlock);
        objectifiedBlock.header = Object.assign(new BlockHeader(), objectifiedBlock.header);
        return objectifiedBlock;
    }
}

class Blockchain {
    constructor(blocks) {
        this._blocks = deepCopy(blocks);   // 처음 생성할 때만 실제 블록들의 정보를 복제
        try { this._length = this.blocks.length; } catch (err) { /* console.log(err); */ } // for decode()
    }

    get blocks() {     // this.blocks, 자체 값 대신 복제본을 반환하므로 외부에서 변경불가능한 immutable 상태로 사용가능
        return this._blocks;
    }

    get length() {
        return this._length;
    }

    push(newBlock) {
        this.blocks.push(newBlock);
        this._length = this.blocks.length;
    }

    indexWith(index) {
        if (index >= this.length || index < (-1) * this.length) { throw RangeError(); }

        if (index < 0) { return this.blocks[this.length + index]; }
        else { return this.blocks[index]; }
    }

    latestBlock() {
        return this.indexWith(-1);
    }

    latestBlockHash() {
        return this.latestBlock().hash();
    }

    encode() {
        return JSON.stringify(this);
    }

    decode(encodedBlockchain) {
        var decodedBlockchain = JSON.parse(encodedBlockchain);
        var objectifiedBlockchain = Object.assign(new Blockchain(), decodedBlockchain);

        var decodedBlocks = objectifiedBlockchain.blocks.map(function (encodedBlock) {
            /**
             * TODO: optimization.
             * Meaningless repetition of JSON.stringify and JSON.parse in Block().decode()
             */
            return new Block().decode(JSON.stringify(encodedBlock));
        });

        return new Blockchain(decodedBlocks);
    }

    async save() {
        const encodedBlockchain = this.encode();
        try { await db.put("Blockchain", encodedBlockchain); }  // data의 key를 "Blockchain"로 명명
        catch (err) { throw err; }
    }

    async load() {
        try {
            const encodedBlockchain = await db.get("Blockchain");
            return new Blockchain().decode(encodedBlockchain);
        }
        catch (err) {
            return undefined;
        }
    }
}

export {
    BlockHeader,
    Block,
    Blockchain
};
