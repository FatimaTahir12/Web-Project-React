import axios from 'axios'
import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'


const PieChart = ({username}) => {
    const [expenses, setExpenses] = useState(0);
    const [goals, setGoals] = useState(0);
    
    // const [dataarr, setData] = useState([]);

    const data = {
        labels: ['Spent', 'Available'],
        datasets: [
            {
                data: [expenses, goals],
                backgroundColor: ['orangered', 'aqua']
            }
        ]
    }

    const options = {
        
    }   

    ChartJS.register(
        ArcElement,
        Tooltip,
        Legend
    );


    const getExpenses = async () => {
        try {

            const fetchData = await axios.post('/expenses', {"username": username});
            let result = fetchData.data.map(({amount}) => amount).reduce((partialSum, a) => partialSum + a, 0);
            setExpenses(result);
            
        } catch(err){
            console.log(err);
        }
    }


    const getGoals = async () => {
        try {
            const fetchData = await axios.post('/goals', {"username": username});
            let result = fetchData.data.map(({amount}) => amount).reduce((partialSum, a) => partialSum + a, 0);
            setGoals(result - expenses);
            
        } catch(err){
            console.log(err);
        }
    }

    const loadData = () => {
        getExpenses();
        getGoals();
    }
    
    return (
        <div onLoad={loadData()}>

            <Pie data={data} options={options} ></Pie>
        </div>
    )
}

export default PieChart