const initialData = [
    {
        name: 'Adam',
        age: 20,
        salary: 30100
    },
    {

        name: 'Bob',
        age: 60,
        salary: 102000
    },
    {
        name: 'Carla',
        age: 31,
        salary: 57000
    },
    {
        name: 'Dave',
        age: 42,
        salary: 22000
    },
    {
        name: 'Ethel',
        age: 80,
        salary: 91000
    },
    {
        name: 'Frank',
        age: 28,
        salary: 73000
    },
    {
        name: 'Gina',
        age: 21,
        salary: 16000
    }
]

const selectElement = document.getElementById('sortSelect')
const selectInitialOption = selectElement.value

const sortDataValues = (data, attribute) => data.sort((a, b) => {
    const aValue = a[attribute]
    const bValue = b[attribute]
    return aValue > bValue ? -1 : 1;
})

const calculateBoundries = (data, attribute) => {
    const values = data.map((singleData) => singleData[attribute])
    const setMin = Math.min(...values)
    const setMax = Math.max(...values)
    const range = setMax - setMin
    const offset = range * 0.1
    return {
        min: setMin - offset,
        max: setMax + offset
    }
}

const renderLabels = (values, selectedOption) => {
    const labelsElement = document.getElementById('labels')
    labelsElement.innerHTML = ''
    values.forEach(value => {
        const labelValue = value['name']
        const metric = value[selectedOption]
        labelsElement.innerHTML += `<div class="singleLabelWrapper"><div class="singleLabel">${labelValue}</div><div class="singleMetric">${metric}</div></div>`
    })
}

const renderAxis = (values, boundries) => {
    const { max } = boundries
    const chartElement = document.getElementById('chart')
    chartElement.innerHTML = ''
    values.forEach(value => {
        const percentage = Math.ceil(value / max * 100);
        chartElement.innerHTML += `<div class="singleBarWrapper"><div style="width:${percentage}%" class="singleBar"></div></div>`
    })
}

const renderChart = (selectedOption, data) => {
    const sortedValues = sortDataValues(data, selectedOption)
    const calculatedBoundries = calculateBoundries(data, selectedOption)

    const onlyValues = sortedValues.map(value => value[selectedOption])
    renderLabels(sortedValues, selectedOption)
    renderAxis(onlyValues, calculatedBoundries)
}

selectElement.addEventListener('change', function(){
    renderChart(this.value, initialData)
})

renderChart(selectInitialOption, initialData)