import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Table } from 'react-bootstrap';

class ProjectsSummary extends React.Component {
  render () {

    // TODO: use real data
    const data = [
      {name: 'Project Name A', hours: 230},
      {name: 'Project Name B', hours: 540},
      {name: 'Project Name C', hours: 940},
      {name: 'Project Name D', hours: 25},
      {name: 'Project Name E', hours: 3},
      {name: 'Project Name F', hours: 410},
      {name: 'Project Name G', hours: 120}
    ];

    // TODO: choose more harmonious color combination from Helsinki palette
    const COLORS = ['#0072c6', '#009246','#bd2719','#ffc61e', '#00d7a7', '#f5a3c7', '#ffe977','#c2a251'];
    const RADIAN = Math.PI / 180;

    // Render custom label with percentage, center the figure in the slice of pie
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    // Render color swatch for legend
    const renderSwatch = (data) => {
      const swatchStyle = {
        backgroundColor: data.color
      };

      return (
        <td style={swatchStyle}>&nbsp;&nbsp;</td>
      );
    }

    // Render custom legend as a table
    const renderLegend = (props) => {
      const { payload } = props;

      return (
        <Table condensed hover className="small">
          <tbody>
          {
            payload.map((entry, index) => (
              <tr key={`item-${index}`}>{renderSwatch(entry)}<td>{entry.value}</td><td>({entry.payload.hours}h)</td></tr>
            ))
          }
          </tbody>
        </Table>
      );
    }

    // The project breakdown pie
    return (
      <div>
        <h5>Hours per Project</h5>
    	  <PieChart width={600} height={400}>
          <Pie
            data={data}
            cx={150}
            cy={150}
            outerRadius={120}
            dataKey="hours"
            nameKey="name"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" align="right" layout="vertical" content={renderLegend}/>
        </PieChart>
      </div>
    );
  }
}

export default ProjectsSummary;
