import React from 'react';

import { Bar } from 'react-chartjs-2';


function Analytics({ contractor }) {

    let concreteTotal = 0;
    let woodTotal = 0;
    let steelTotal = 0;

    let run = contractor.projects.map((project) => project.recycleItems.map((item) => {
        if (item.material === "Concrete"){
            concreteTotal = concreteTotal + item.quantity;
        }
        if (item.material === "Wood"){
            woodTotal = woodTotal + item.quantity;
        }
        if (item.material === "Steel"){
            steelTotal = steelTotal + item.quantity;
        }
    }));

    const state = {
        labels: ['Concrete', 'Wood', 'Steel'],
        datasets: [
          {
            label: 'Total Amount Recycled',
            backgroundColor: ['slategray', '#663300', '#b7410e'], 
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [concreteTotal, woodTotal, steelTotal]
          }
        ]
      }

    return ( 
        <div className="chart-container boxShadow m-2">
            <Bar
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Recycle',
                        fontSize: 30
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            font: {
                                size: 26
                            },
                            color: 'black'
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
        

    )
}

export default Analytics;