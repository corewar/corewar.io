"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ICore_1 = require("../../simulator/interface/ICore");
const _ = require("underscore");
class CoreRenderer {
    constructor(canvas, instructionLabel, core, instructionSerialiser) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.instructionLabel = instructionLabel;
        this.core = core;
        this.instructionSerialiser = instructionSerialiser;
        this.queue = [];
        core.coreAccess.subscribe((e) => {
            this.queue.push(e);
        });
    }
    initialise() {
        this.cellSize = this.calculateCellSize();
        this.cellsWide = Math.floor(this.canvas.width / this.cellSize);
        this.cellsHigh = Math.floor(this.canvas.height / this.cellSize);
        this.previousExecutions = [];
        this.canvas.addEventListener("click", (e) => { this.canvasClick(e); });
        this.renderGrid();
    }
    render() {
        var event;
        while (this.previousExecutions.length !== 0) {
            event = this.previousExecutions.pop();
            this.renderCell(event, "#f00");
        }
        this.previousExecutions = _(this.queue).where((q) => q.accessType === ICore_1.CoreAccessType.execute);
        while (this.queue.length !== 0) {
            event = this.queue.shift();
            this.renderCell(event, "#fff");
        }
        this.renderGridLines();
    }
    addressToScreenCoordinate(address) {
        var ix = address % this.cellsWide;
        var iy = Math.floor(address / this.cellsWide);
        return {
            x: ix * this.cellSize,
            y: iy * this.cellSize
        };
    }
    screenCoordinateToAddress(point) {
        var x = Math.floor(point.x / this.cellSize);
        var y = Math.floor(point.y / this.cellSize);
        return y * this.cellsWide + x;
    }
    renderCell(event, executionColour) {
        var coordinate = this.addressToScreenCoordinate(event.address);
        //TODO colour for each process
        this.context.fillStyle = "#f00";
        this.context.strokeStyle = "#f00";
        switch (event.accessType) {
            case ICore_1.CoreAccessType.execute:
                this.renderExecute(coordinate, executionColour);
                break;
            case ICore_1.CoreAccessType.read:
                this.renderRead(coordinate);
                break;
            case ICore_1.CoreAccessType.write:
                this.renderWrite(coordinate);
                break;
            default:
                throw Error("Cannot render unknown CoreAccessType: " + event.accessType);
        }
    }
    renderExecute(coordinate, executionColour) {
        var colour = this.context.fillStyle;
        this.context.fillStyle = executionColour;
        this.context.fillRect(coordinate.x, coordinate.y, this.cellSize, this.cellSize);
        this.context.fillStyle = colour;
    }
    renderRead(coordinate) {
        var hSize = this.cellSize / 2;
        var radius = this.cellSize / 8;
        var centre = {
            x: coordinate.x + hSize,
            y: coordinate.y + hSize
        };
        this.context.beginPath();
        this.context.arc(centre.x, centre.y, radius, 0, 2 * Math.PI, false);
        this.context.fill();
        //this.context.stroke();
    }
    renderWrite(coordinate) {
        var x0 = coordinate.x;
        var y0 = coordinate.y;
        var x1 = x0 + this.cellSize;
        var y1 = y0 + this.cellSize;
        this.context.beginPath();
        this.context.moveTo(x0, y0);
        this.context.lineTo(x1, y1);
        this.context.moveTo(x0, y1);
        this.context.lineTo(x1, y0);
        this.context.stroke();
    }
    renderGrid() {
        this.clearCanvas();
        this.fillGridArea();
        this.renderGridLines();
        this.greyOutExtraCells();
    }
    clearCanvas() {
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
    }
    fillGridArea() {
        var width = this.cellsWide * this.cellSize;
        var height = this.cellsHigh * this.cellSize;
        this.context.fillStyle = "#eee";
        this.context.fillRect(0, 0, width, height);
    }
    greyOutExtraCells() {
        var cellsDrawn = this.cellsWide * this.cellsHigh;
        var extraCellsDrawn = cellsDrawn - this.core.getSize();
        if (extraCellsDrawn === 0) {
            return;
        }
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        var maxX = gridWidth - this.cellSize;
        var maxY = gridHeight - this.cellSize;
        var x = maxX;
        var y = maxY;
        this.context.fillStyle = "#aaa";
        while (extraCellsDrawn-- > 0) {
            this.context.fillRect(x, y, this.cellSize, this.cellSize);
            x -= this.cellSize;
            if (x < 0) {
                x = maxX;
                y -= this.cellSize;
            }
        }
    }
    renderGridLines() {
        this.context.beginPath();
        this.renderVerticalLines();
        this.renderHorizontalLines();
        this.context.strokeStyle = "#aaa";
        this.context.stroke();
    }
    renderHorizontalLines() {
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        for (var y = 0; y <= gridHeight; y += this.cellSize) {
            this.context.moveTo(0, y);
            this.context.lineTo(gridWidth, y);
        }
    }
    renderVerticalLines() {
        var gridWidth = this.cellsWide * this.cellSize;
        var gridHeight = this.cellsHigh * this.cellSize;
        for (var x = 0; x <= gridWidth; x += this.cellSize) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, gridHeight);
        }
    }
    calculateCellSize() {
        var area = this.canvas.width * this.canvas.height;
        var n = this.core.getSize();
        var maxCellSize = Math.sqrt(area / n);
        var possibleCellSize = Math.floor(maxCellSize);
        while (!this.isValidCellSize(possibleCellSize)) {
            possibleCellSize--;
        }
        return possibleCellSize;
    }
    isValidCellSize(cellSize) {
        var cellsWide = Math.floor(this.canvas.width / cellSize);
        var cellsHigh = Math.floor(this.canvas.height / cellSize);
        return cellsWide * cellsHigh >= this.core.getSize();
    }
    getRelativeCoordinates(event) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var currentElement = event.target;
        do {
            totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
            totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
        } while (currentElement = currentElement.offsetParent);
        var canvasX = event.pageX - totalOffsetX;
        var canvasY = event.pageY - totalOffsetY;
        return { x: canvasX, y: canvasY };
    }
    canvasClick(e) {
        var point = this.getRelativeCoordinates(e);
        var address = this.screenCoordinateToAddress(point);
        var instruction = this.core.getAt(address);
        this.instructionLabel.innerText = this.instructionSerialiser.serialise(instruction);
    }
}
exports.CoreRenderer = CoreRenderer;
