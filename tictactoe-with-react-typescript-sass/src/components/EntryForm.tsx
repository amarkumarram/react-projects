import { useState } from "react";
import { FormField } from "./FormField";
import { Grid } from "./Grid";

export function EntryForm() {

    const [playerName, setPlayerName] = useState<any>({ firstPlayerName: "", secondPlayerName: "" });
    const [errorMsg, setErrorMsg] = useState<any>({ firstPlayerError: "", secondPlayerError: "" });
    const [overallErrorStatus, setOverallErrorStatus] = useState<boolean>(false);

    const handlePlayerName = (e: any) => {
        const playerNameVal: string = e.target.value.trim();
        const playerNameValCheck: boolean = /^[a-z A-Z]+$/.test(playerNameVal);
        if (playerNameValCheck) {
            e.target.name == "firstPlayerName" ? setPlayerName({ ...playerName, firstPlayerName: playerNameVal }) :
                setPlayerName({ ...playerName, secondPlayerName: playerNameVal })
            e.target.name == "firstPlayerName" ? setErrorMsg({ ...errorMsg, firstPlayerError: "" }) :
                setErrorMsg({ ...errorMsg, secondPlayerError: "" })
        } else {
            e.target.name == "firstPlayerName" ? setErrorMsg({ ...errorMsg, firstPlayerError: "Please enter valid first player name." }) :
                setErrorMsg({ ...errorMsg, secondPlayerError: "Please enter valid second player name." })
        }
    }

    const handleSubmit = () => {
        if (playerName.firstPlayerName != "" && playerName.secondPlayerName != "" && errorMsg.firstPlayerError == "" && errorMsg.secondPlayerError == "") {
            setOverallErrorStatus(true);
        } else {
            if (playerName.firstPlayerName == "") {
                setErrorMsg({ ...errorMsg, firstPlayerError: "Please enter valid first player name." })
            } else if (playerName.secondPlayerName == "") {
                setErrorMsg({ ...errorMsg, secondPlayerError: "Please enter valid second player name." })
            }
        }
    }

    const handleLandOnLogin = () => {
        setOverallErrorStatus(false);
    }

    return (
        <>
            {
                overallErrorStatus ? <Grid playerObj={playerName} handleLandOnLogin={() => handleLandOnLogin()} /> : <FormField playerNameHandler={handlePlayerName} errorObj={errorMsg} submitHandler={handleSubmit} />
            }
        </>
    )
}