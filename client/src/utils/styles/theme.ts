import { createMuiTheme } from '@material-ui/core/styles'

export const green = '#0c8c00'
export const red = '#d32f2f'
export const orange = '#febc00'

const theme = createMuiTheme({
    palette: {
        primary: { main: green },
        secondary: { main: red }
    }
})

export default theme