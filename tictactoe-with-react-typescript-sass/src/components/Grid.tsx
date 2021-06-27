import { useState, useEffect } from 'react';
import { GridCell } from './GridCell';

export function Grid(props: any) {
    const { firstPlayerName, secondPlayerName } = props.playerObj;
    const { handleLandOnLogin } = props;

    const [clickedCellArr, updateClickedCellArr] = useState<Array<number>>([]);
    const [resultText, setResultText] = useState<string>("");
    const [elementRef, setElementRef] = useState<Array<any>>([]);
    const [enableReset, setEnableReset] = useState<boolean>(false);
    const [winnerArr, setWinnerArr] = useState<Array<number>>([]);
    const [winnerStatus, setWinnerStatus] = useState<string>("");

    const decideWinner = (arr: Array<number>): string => {
        let response = "nothing";
        if (arr.indexOf(5) != -1) {
            if (arr.indexOf(1) != -1 && arr.indexOf(9) != -1) {
                response = "winner";
                setWinnerArr([1,5,9]);
            } else if (arr.indexOf(2) != -1 && arr.indexOf(8) != -1) {
                response = "winner";
                setWinnerArr([2,5,8]);
            } else if (arr.indexOf(3) != -1 && arr.indexOf(7) != -1) {
                response = "winner";
                setWinnerArr([3,5,7]);
            } else if (arr.indexOf(4) != -1 && arr.indexOf(6) != -1) {
                response = "winner";
                setWinnerArr([4,5,6]);
            }
        }
        if (arr.indexOf(1) != -1 && response == "nothing") {
            if (arr.indexOf(2) != -1 && arr.indexOf(3) != -1) {
                response = "winner";
                setWinnerArr([1,2,3]);
            } else if (arr.indexOf(4) != -1 && arr.indexOf(7) != -1) {
                response = "winner";
                setWinnerArr([1,4,7]);
            }
        }
        if (arr.indexOf(9) != -1 && response == "nothing") {
            if (arr.indexOf(3) != -1 && arr.indexOf(6) != -1) {
                response = "winner";
                setWinnerArr([3,6,9]);
            } else if (arr.indexOf(7) != -1 && arr.indexOf(8) != -1) {
                response = "winner";
                setWinnerArr([7,8,9]);
            }
        }
        if(response == "nothing") {
            setWinnerArr([]);
        }
        return response;
    }

    const handleCellClick = (e: any) => {
        if (resultText == "") {
            const cellNum: number = parseInt(e.target.getAttribute("data-cell"));
            if (!isNaN(cellNum) && clickedCellArr.indexOf(cellNum) == -1) {
                const updatedClickedCellArr: Array<number> = [...clickedCellArr, cellNum];
                updateClickedCellArr(updatedClickedCellArr);
                setEnableReset(true);
                const clickedCellArrLength: number = updatedClickedCellArr.length;
                if (clickedCellArrLength % 2 == 0) {
                    e.target.innerHTML = "<span>o</span>";
                } else {
                    e.target.innerHTML = "<span class='cross'>x</span>";
                }
                const cellIndex = parseInt(e.target.getAttribute("data-cell"));
                const tempElementRefArr = [...elementRef];
                tempElementRefArr[cellIndex] = e.target;
                setElementRef(tempElementRefArr);
            }
        }
    }

    const resetGame = () => {
        elementRef.forEach(e => {
            if(e != undefined) {
                e.innerHTML = "";
                e.style.backgroundColor = "#ffffff";
            }
        })
        updateClickedCellArr([]);
        setResultText("");
        setElementRef([]);
        setEnableReset(false);
        setWinnerStatus("");
    }

    useEffect(() => {
        if (winnerStatus == "winner") {
            clickedCellArr.length % 2 != 0 ? setResultText(`${firstPlayerName} Won!`) : setResultText(`${secondPlayerName} Won!`);
            winnerArr.forEach((el) => {
                elementRef[el].style.backgroundColor = "#66ffff";
            })
        } else if (clickedCellArr.length == 9 && winnerStatus == "nothing") {
            setResultText("Match Draw!");
        }
    },[winnerArr]);

    useEffect(() => {
        const clickedCellArrLength: number = clickedCellArr.length;
        if (clickedCellArrLength >= 5) {
            let playerArr: Array<number>;
            //check win-loose-tie
            if (clickedCellArrLength % 2 != 0) {
                //first player
                playerArr = clickedCellArr.filter((el: number, index: number) => {
                    return index % 2 == 0;
                });
            } else {
                //second player
                playerArr = clickedCellArr.filter((el: number, index: number) => {
                    return index % 2 != 0;
                });
            }
            const result: string = decideWinner(playerArr);
            setWinnerStatus(result);
        }
    }, [clickedCellArr]);

    return (
        <>
            <div className="grandParentGridContainer">
                {
                    <div className="menuContainer">
                        <button onClick={() => handleLandOnLogin()}>New Game</button>
                        <button onClick={() => resetGame()} disabled={!enableReset}>Reset</button>
                    </div>
                }
                <div className="parentGridContainer">
                    <div className="parentGridCell">
                        <h2>First Player</h2>
                        <h3>{firstPlayerName}</h3>
                    </div>
                    <div className="gridContainer">
                        <GridCell clickHandler={handleCellClick} cellNumber="1" />
                        <GridCell clickHandler={handleCellClick} cellNumber="2" />
                        <GridCell clickHandler={handleCellClick} cellNumber="3" />
                        <GridCell clickHandler={handleCellClick} cellNumber="4" />
                        <GridCell clickHandler={handleCellClick} cellNumber="5" />
                        <GridCell clickHandler={handleCellClick} cellNumber="6" />
                        <GridCell clickHandler={handleCellClick} cellNumber="7" />
                        <GridCell clickHandler={handleCellClick} cellNumber="8" />
                        <GridCell clickHandler={handleCellClick} cellNumber="9" />
                    </div>
                    <div className="parentGridCell">
                        <h2>Second Player</h2>
                        <h3>{secondPlayerName}</h3>
                    </div>
                </div>
                {
                    resultText != "" ? <h2 className="resultInfo">{resultText}</h2> :
                        <h2 className="turnInfo">{clickedCellArr.length % 2 == 0 ? firstPlayerName :
                            secondPlayerName}, it's your turn now.</h2>
                }
            </div>
        </>
    )
}