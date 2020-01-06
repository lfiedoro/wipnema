import React from 'react';
import PropType from 'prop-types';
import { overflowDiv, rowStyles, selectedMovieStyle } from "./styles";
import { dateFormatted, rowLetters, showTimeHourFormatted } from "./constants";
import Button from "@material-ui/core/Button";

class Sits extends React.Component {
    state = {
        row: 0,
        column: 0
    };


    handleDateFormat = () => {

        return (
            <h3 className={'gradientText'}>
                {showTimeHourFormatted(this.props)} {dateFormatted(this.props)}
            </h3>
        );
    };


    onSitSelect = (event) => {
        const row = event.target.parentNode.parentNode.rowIndex;
        const column = event.target.parentNode.cellIndex;

        console.log(event.target);
        console.log(`row ${row} col ${column}`);

        this.setState({ row, column },
            () => this.props.onSelect(this.state.row, this.state.column));
    };

    createEmpty(sits) {
        for (var x = 0; x < this.props.sits.rowLength; x++) {
            sits[x] = [];
            for (var y = 0; y < this.props.sits.rows; y++) {
                sits[x][y] = (
                    <Button size={"small"}
                        style={{ minWidth: '20px' }}
                        color={"primary"}
                        onClick={this.onSitSelect}
                        variant="contained"
                    >
                        {y + 1}
                    </Button>
                );
            }
        }
    }

    markTaken(sits) {
        for (let sit of this.props.sits.seatsTaken) {
            sits[sit.row][sit.number] = "🐈";
        }
    }

    render() {
        const sits = [];
        this.createEmpty(sits);
        this.markTaken(sits);

        let key = 0;
        const sitsGrid = sits.map((row, index) => {
            return (

                <tr style={rowStyles} key={key++}>
                    <td className='gradientText'>
                        {rowLetters[index]}
                    </td>
                    {row.map((s) => {
                        return <td style={{ verticalAlign: 'bottom' }} key={key++}>{s}</td>;
                    })}
                </tr>
            );
        });


        return (
            <div>
                <div style={selectedMovieStyle(this.props)}>
                    <div className='shader bottom poster'>
                        <h2>{this.props.title}</h2>
                        {this.handleDateFormat()}
                    </div>
                </div>
                <div style={overflowDiv}>
                    <table style={{ borderCollapse: 'separate' }}>
                        <tbody>
                            {sitsGrid}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Sits.propTypes = {
    sits: PropType.object,
    title: PropType.string,
    poster: PropType.string,
    onSelect: PropType.func
};

export default Sits;
