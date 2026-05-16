import { Grid } from "@mui/material"
import { JSX } from "react"

type GridProps = {
    children: JSX.Element[]
}

export default function ItemGrid(props: GridProps) {

    return (
        <>
            <Grid container spacing={2} sx={{maxWidth: '100%', padding: 3}}>
                    {
                        [...props.children.keys()].map((id) => 
                            <Grid size={4}>
                            {props.children[id] ?? null}
                    </Grid>)
                    }
                </Grid>
        </>
    )
}