export function FormField(props: any) {

    const { playerNameHandler, errorObj, submitHandler } = props;

    return (
        <div className="flexContainer">
            <form className="flexFormContainer" autoComplete="off">
                <label>First Player Name:</label>
                <input type="text" placeholder="Enter first player name" onChange={(e) => playerNameHandler(e)} name="firstPlayerName" />
                <div id="firstPlayerError" className="error">{errorObj.firstPlayerError}</div>
                <label>Second Player Name:</label>
                <input type="text" placeholder="Enter second player name" onChange={(e) => playerNameHandler(e)} name="secondPlayerName" />
                <div id="secondPlayerError" className="error">{errorObj.secondPlayerError}</div>
                <button type="button" onClick={() => submitHandler()}>Play</button>
            </form>
        </div>
    )
}