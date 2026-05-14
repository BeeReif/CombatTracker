import Grid from '@mui/material/Unstable_Grid2';

type GridProps = {
    children: JSX.Element[]
}

export default function ItemGrid(props: GridProps) {

    return (
        <>
            <Grid container spacing={2} maxWidth={'100%'} padding={3}>
                    {
                        [...Array(9).keys()].map((id) => 
                            <Grid xs={4}>
                            {props.children[id] ?? null}
                    </Grid>)
                    }
                </Grid>
        </>
    )
}