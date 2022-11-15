import React from "react";

const Table = ({ columns, data }) => {

  return (
    <table className="custom-table">
      <tr className="table-row table-head text-center">
        {
          columns.map(x => (
            <th key={x.key}>{x.title}</th>
          ))
        }
      </tr>
      {
        data.map(x => (
          <tr className="table-row text-center">
            {
              columns.map((y, i) => (
                <td key={Math.random() * (i + 1)}>{y.render ? y.render(x[y.dataIndex]) : x[y.dataIndex]}</td>
              ))
            }
          </tr>
        ))
      }
    </table>
  )
}

export default Table;