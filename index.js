const game = {
    numRings: 5,
    towers: [[0, 1, 2, 3, 4], [], []],
};

const colors = [
    '#ff3333',
    '#ffaf33',
    '#fff633',
    '#33ff99',
    '#33ffdd',
    '#33caff',
    '#3383ff',
    '#9a74f7',
    '#d174f7',
    '#f774db',
];

class GameDisplay {
    constructor(canvasId) {
        this.setCanvas(canvasId);
    }

    setCanvas(canvasId) {
        this.canvas = document.querySelector(`#${canvasId}`);
        if (!this.canvas) {
            throw new Error(`Could not find canvas with id: ${canvasId}`);
        }
        this.context = this.canvas.getContext('2d');
        this.towerSpaceWidth = this.canvas.width / 3;
        this.towerBottom = this.canvas.height * 0.9;
        this.towerTop = this.canvas.height * 0.1;
    }

    draw(game) {
        this.clear();
        this.drawTower(0);
        this.drawTower(1);
        this.drawTower(2);
        this.drawAllRings(game.towers);
    }

    clear() {
        this.context.fillStyle = '#FFFFFF';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawAllRings(towerArray) {
        towerArray.forEach((tower, towerIndex) => {
            tower.forEach((ringId, ringIndex) => {
                this.drawRing(towerIndex, ringId, ringIndex);
            });
        });
    }

    drawRing(towerId, ringId, stackPosition) {
        const ringHeight = this.canvas.height * 0.05;
        const ringWidth =
            this.towerSpaceWidth * 0.8 - (this.towerSpaceWidth * ringId) / 10;
        const left = this.towerSpaceWidth * (towerId + 0.5) - ringWidth / 2;
        const bottom =
            this.towerBottom -
            0.2 * ringHeight -
            1.2 * ringHeight * stackPosition;
        const top = bottom - ringHeight;
        this.context.fillStyle = colors[ringId % colors.length];
        this.context.fillRect(left, top, ringWidth, ringHeight);
    }

    drawTower(index) {
        this.context.fillStyle = '#000000';
        const left = this.towerSpaceWidth * index + this.towerSpaceWidth * 0.1;
        const right = left + this.towerSpaceWidth * 0.8;
        const center = (left + right) / 2;

        this.context.moveTo(left, this.towerBottom);
        this.context.lineTo(right, this.towerBottom);
        this.context.stroke();

        this.context.moveTo(center, this.towerBottom);
        this.context.lineTo(center, this.towerTop);
        this.context.stroke();
    }
}

function moveRing(sourceTower, destTower) {
    const towers = game.towers;
    if (towers[sourceTower].length > 0) {
        const value = towers[sourceTower].pop();
        towers[destTower].push(value);
    }
}

const display = new GameDisplay('main-canvas');
display.draw(game);

for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
        if (i !== j) {
            document.querySelector(`#mv${i}to${j}`).onclick = () => {
                moveRing(i, j);
                display.draw(game);
            };
        }
    }
}
