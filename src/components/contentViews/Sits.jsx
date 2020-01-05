import React from 'react';
import PropType from 'prop-types';

class Sits extends React.Component {
    state = {
        row: 0,
        column: 0
    }

    onSitSelect = (event) => {
        const row = event.target.parentNode.rowIndex;
        const column = event.target.cellIndex;

        console.log(`row ${row} col ${column}`);

        this.setState({ row, column },
                      () => this.props.onSelect(this.state.row, this.state.column));
    }

    createEmpty(sits) {
        for(var x = 0; x < this.props.sits.rowLength; x++){
            sits[x] = [];
            for(var y = 0; y < this.props.sits.rows; y++){
                sits[x][y] = "🪑";
            }
        }
    }

    markTaken(sits) {
        for(let sit of this.props.sits.seatsTaken) {
            sits[sit.row][sit.number] = "🐈";
        }
    }

    render() {
        const sits = [];
        this.createEmpty(sits);
        this.markTaken(sits);

        let key = 0;
        const sitsGrid = sits.map((row) => {
            return (
                <tr key={key++}>
                  {row.map((s) => {
                      return <td key={key++} onClick={this.onSitSelect}>{s}</td>;
                })}
                </tr>
            );
        });


        return <table><tbody>{sitsGrid}</tbody></table>;
    }
}

Sits.propTypes = {
    sits: PropType.object,
    onSelect: PropType.func
};

export default Sits;
