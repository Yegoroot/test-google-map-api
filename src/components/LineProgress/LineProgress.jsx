import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        width: ' 100%',
        position: 'absolute',
        left: 0,
        height: 6,
        top: 0,
    },
})

export default function LinearIndeterminate() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    )
}
