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

    render() {
        let key = 0;
        const sitsGrid = this.props.sits.map((row) => {
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
    sits: PropType.array,
    onSelect: PropType.func
};

export default Sits;
