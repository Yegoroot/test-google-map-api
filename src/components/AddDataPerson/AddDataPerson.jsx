import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid, TextField, MenuItem } from '@material-ui/core'
import { connect } from 'react-redux'
import { addPerson } from '../../ducks/person'

// snack
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const currencies = [
    {
        value: 'model1',
        label: 'Модель 1',
    },
    {
        value: 'model2',
        label: 'Модель 2',
    },
    {
        value: 'model3',
        label: 'Модель 3',
    },
]

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
    root: {
        width: '100%',
        margin: '40px 0',
        textAlign: 'center',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: 40,
        marginBottom: 30,
    },
    select: {
        width: 230,
        marginBottom: 30,
        textAlign: 'left',
    },
}))

function getSteps() {
    return ['ФИО, день рождения', 'Relation model', 'О машине']
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Привет кандидат, расскажи Папе джонсу как своё полное имя?'
        case 1:
            return 'Для оптимального подбора ... раскажите какими моделями автобусов вы можите управлять?'
        case 2:
            return 'И последний шаг, опишите вашу машину'
        default:
            return 'Uknown stepIndex'
    }
}

export default connect(
    null,
    { addPerson },
)(props => {
    /*
        /////////// COMPONENT
    */
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(0)
    const [data, setDataUser] = React.useState({
        name: '',
        lastName: '',
        category: '',
        model: '',
        year: '',
        speed: '',
    })
    const [open, setOpen] = React.useState(false) // snak

    const steps = getSteps() // steps

    // snack
    function handleClick() {
        setOpen(true)
    }

    //snack
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    // GET VALUE FROM FORM
    function handleChangeInput(e, key) {
        let value = e.target.value
        setDataUser(inputValue => ({
            ...inputValue,
            [key]: value,
        }))
    }

    // проверка на заполненность данных
    function isFull() {
        let is = true
        for (let i in data) {
            if (data[i]) {
            } else {
                is = false
                break
            }
        }
        return is
    }
    // SEND DATA
    function handleSendData() {
        props.addPerson(data)
    }

    // FORM
    function Form(index) {
        switch (index) {
            case 0:
                return (
                    <Grid item style={{ paddingBottom: 40 }}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <TextField
                                    onChange={e => handleChangeInput(e, 'lastName')}
                                    label="Фамилия"
                                    placeholder="Введите Фамилию"
                                    margin="normal"
                                    value={data.lastName}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    onChange={e => handleChangeInput(e, 'name')}
                                    label="Имя"
                                    placeholder="Введите Имя"
                                    margin="normal"
                                    value={data.name}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )
            case 1:
                return (
                    <TextField
                        select
                        label="Выберете категорию прав"
                        className={classes.select}
                        value={data.category}
                        onChange={e => handleChangeInput(e, 'category')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal">
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )
            case 2:
                return (
                    <Grid item style={{ paddingBottom: 40 }}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <TextField
                                    label="Модель"
                                    onChange={e => handleChangeInput(e, 'model')}
                                    placeholder="Введите Модель"
                                    margin="normal"
                                    value={data.model}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Год"
                                    onChange={e => handleChangeInput(e, 'year')}
                                    placeholder="Введите год"
                                    margin="normal"
                                    value={data.year}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Км/Ч"
                                    onChange={e => handleChangeInput(e, 'speed')}
                                    placeholder="Средняя скорость"
                                    margin="normal"
                                    value={data.speed}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                )

            default:
                return index
        }
    }

    function handleNext() {
        if (activeStep === 2) {
            if (!isFull()) {
                // если не прошли проверку
                handleClick() // плказать сообщение чтоб заполнили данными
            } else {
                setActiveStep(prevActiveStep => prevActiveStep + 1)
            }
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1)
        }
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    function handleReset() {
        setActiveStep(0)
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: 100 }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>Все шаги пройдены</Typography>
                        <Button onClick={handleReset}>Заново пройти</Button>
                        <Button variant="contained" color="primary" onClick={handleSendData}>
                            Вперед к локации!
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h2 className={classes.instructions}>{getStepContent(activeStep)}</h2>

                        {activeStep === 0 ? Form(0) : null}
                        {activeStep === 1 ? Form(1) : null}
                        {activeStep === 2 ? Form(2) : null}

                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                                Назад
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Готово' : 'Следующий шаг'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={
                    <span id="message-id">
                        Не все данные заполнены, их ведь и так мало, пожалуйста заполните все поля
                    </span>
                }
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                        Щас заполню
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    )
})
