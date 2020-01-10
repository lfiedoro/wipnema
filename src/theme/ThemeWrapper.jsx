import React, {Component} from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import App from "../components/App";

class ThemeWrapper extends Component {
    theme = createMuiTheme({
        palette: {
            type: 'dark',
            primary: {
                light: 'rgba(126, 193, 209, 1)',
                main: 'rgba(126, 193, 209, 1)',
                dark: 'rgb(85,159,179)',
                contrastText: 'rgba(39, 41, 50, 1)',
            },
            secondary: {
                light: 'rgba(229, 247, 125, 1)',
                main: 'rgb(193,208,113)',
                dark: 'rgb(144,164,95)',
                contrastText: 'rgba(39, 41, 50, 1)',
            },
            warning: {
                light: 'rgb(247,63,85)',
                main: 'rgb(247,41,47)',
                dark: 'rgb(161,41,55)',
                contrastText: 'rgba(255, 255, 255, 1)',
            }
        },
    });

    render() {
        return (
            <ThemeProvider theme={this.theme}>
                <App/>
            </ThemeProvider>
        );
    }
}

export default ThemeWrapper;
