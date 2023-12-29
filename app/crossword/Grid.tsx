'use client'

import Cell from './Cell';

import { useState } from 'react'

export default function Grid() {
    const [gridSize, setGridSize] = useState({width: 15, height: 15});
    return (
        <Cell />
    );
}