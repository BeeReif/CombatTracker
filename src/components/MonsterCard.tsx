import { Box, Button, Card, CardContent, Chip, Divider, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";

type CardProps = {
    color: string;
    name: string;
    maxHp: number;
    ac: number;
    count: number;
    notes?: string[];
}

export default function MonsterCard(props: CardProps) {

    const [currentHp, setCurrentHp] = useState<number>(props.maxHp * props.count)
    const [maxHp, setMaxHp] = useState<number>(props.maxHp * props.count)
    const [damageVal, setDamageVal] = useState<number>(0)
    const [dieSize, setDieSize] = useState<number>(20)
    const [modifier, setModifier] = useState<number>(0)
    const [dc, setDc] = useState<number>(10)
    const [rollCount, setRollCount] = useState<number>(props.count)
    const [rollResults, setRollResults] = useState<number[]>([])
    const [hits, setHits] = useState<number>(0)
    const [rollTotal, setRollTotal] = useState<number>(0)
    const unitsRemaining = Math.ceil(currentHp/props.maxHp)


    function handleChangeDamage(e: React.ChangeEvent<HTMLInputElement>) {
        setDamageVal(+e.currentTarget.value)
    }

    function handleChangeHitPoints(_e: React.MouseEvent<HTMLButtonElement>, damage: number) {
        if (currentHp + (damageVal * damage) <= 0)
            setCurrentHp(0)
        else if (currentHp + (damageVal * damage) <= maxHp) {
            setCurrentHp(currentHp + (damageVal * damage))
            setRollCount(Math.ceil((currentHp + (damageVal * damage))/props.maxHp))
            setMaxHp(Math.ceil((currentHp + (damageVal * damage))/props.maxHp) * props.maxHp)
        }
        else
            setCurrentHp(maxHp)
    }

    function handleChangeDie(e: SelectChangeEvent) {
        setDieSize(+e.target.value)
    }

    function handleChangeMod(e: React.ChangeEvent<HTMLInputElement>) {
        setModifier(+e.currentTarget.value)
    }

    function handleChangeDc(e: React.ChangeEvent<HTMLInputElement>) {
        setDc(+e.currentTarget.value)
    }

    function handleChangeCount(e: React.ChangeEvent<HTMLInputElement>) {
        setRollCount(+e.currentTarget.value)
    }

    function handleClickRoll(_: React.MouseEvent<HTMLButtonElement>) {
        const rolls = []
        let hits = 0
        let total = 0
        for(let i = 0; i < rollCount; i++) {
            const roll = Math.ceil(Math.random() * dieSize) + modifier
            rolls.push(roll)
            total += roll
            if (roll > dc && roll - modifier != 1) {
                hits += 1
            }
        }
        setRollResults(rolls)
        setRollTotal(total)
        setHits(hits)
    }

    return(
        <>
            <Card sx={{backgroundColor: 'WhiteSmoke'}}>
                <Grid container>
                    <Grid size={12}>
                        <Divider variant="fullWidth" sx={{backgroundColor: props.color, height: '4px'}}/>
                        <Typography sx={{paddingTop: 1}} variant="h5" align="center" component="div">
                            <Box sx={{fontWeight: 'bold'}}>
                                {props.name}
                            </Box>
                        </Typography>
                    </Grid>
                    <CardContent sx={{width: '100%'}}>
                        <Divider variant="fullWidth"/>
                        <Grid  container rowSpacing={3} sx={{alignItems: 'center', paddingTop: 1}}>
                            <Grid size={12} container columns={24}>
                                <Grid size={5}>
                                    Hit Points: <Chip label={currentHp}/>
                                </Grid>
                                <Grid size={3}>
                                    AC: <Chip label={props.ac}/>
                                </Grid>
                                <Grid size={6}>
                                    Units Remaining: <Chip label={unitsRemaining}/>
                                </Grid>
                                <Grid size={7}>
                                        <TextField label="Damage" type="number" size="small" onChange={handleChangeDamage}/>
                                </Grid>
                                <Grid size={1}>
                                    <Button
                                        sx={{fontSize: '8pt'}}
                                        color="success"
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => handleChangeHitPoints(e, 1)}
                                    >
                                        Heal
                                    </Button>
                                    <Button
                                        sx={{fontSize: '8pt'}}
                                        color="error"
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => handleChangeHitPoints(e, -1)}
                                    >
                                        Hurt
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid size={12} container spacing={1} columns={24}>
                                <Grid size={9}>
                                Roll: <Select value={dieSize.toString()} label={`d${dieSize}`} onChange={handleChangeDie}>
                                    <MenuItem value={4}>d4</MenuItem>
                                    <MenuItem value={6}>d6</MenuItem>
                                    <MenuItem value={8}>d8</MenuItem>
                                    <MenuItem value={10}>d10</MenuItem>
                                    <MenuItem value={12}>d12</MenuItem>
                                    <MenuItem value={20}>d20</MenuItem>
                                </Select>
                                +
                                <TextField
                                    label="Modifier"
                                    type="number"
                                    defaultValue={0}
                                    sx={{maxWidth: '6rem', minWidth: "4rem"}}
                                    onChange={handleChangeMod}/>
                                </Grid>
                                <Grid size={7} container>
                                    <Grid container>
                                        <Grid>
                                            <TextField
                                                label="DC"
                                                type="number"
                                                defaultValue={10}
                                                sx={{maxWidth: '6rem', minWidth: "4rem"}}
                                                onChange={handleChangeDc}/>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid>
                                            <TextField
                                                label="Count"
                                                defaultValue={rollCount}
                                                value={rollCount} 
                                                sx={{maxWidth: '6rem', minWidth: "4rem"}}
                                                onChange={handleChangeCount} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid size={3}>
                                <Button variant="contained" onClick={handleClickRoll}>
                                    Roll
                                </Button>
                                </Grid>
                                <Grid>
                                    <Typography>
                                    {props.notes?.map((note) => <>
                                        {note}<br/>
                                    </>)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid size={12}>
                                Result:
                                {rollResults.map((roll) => 
                                <Typography sx={{display: 'inline'}} color={roll - modifier === 20 ? "#D4AF37" : roll - modifier === 1 ? "red" : roll > dc ? "green" : "red"}>
                                    {` ${roll},`}
                                </Typography>
                                )}
                                { rollResults.length > 0 ?
                                ` Successes: ${hits} ${dieSize < 20 ?  `Total: ${rollTotal}` : ""}`
                                : ""
                                }
                                
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Card>
        </>
    )
}