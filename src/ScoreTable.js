import React from "react";

import makeData from "./makeData";
import Table from "./Table";

export default function ScoreTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Scores",
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "1",
            accessor: "1"
          },
          {
            Header: "2",
            accessor: "2"
          },
          {
            Header: "3",
            accessor: "3"
          },
          {
            Header: "4",
            accessor: "4"
          },
          {
            Header: "5",
            accessor: "5"
          },
          {
            Header: "6",
            accessor: "6"
          },
          {
            Header: "7",
            accessor: "7"
          },
          {
            Header: "8",
            accessor: "8"
          },
          {
            Header: "9",
            accessor: "9"
          },
          {
            Header: "10",
            accessor: "10"
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = React.useState(() =>
    makeData(["Marika", "Tero", "Roni", "Jooseppi"])
  );

  console.log("hh", makeData(["Marika", "Tero", "Roni", "Jooseppi"]));
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <div>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    </div>
  );
}
