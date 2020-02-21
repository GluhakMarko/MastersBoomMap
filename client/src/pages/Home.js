import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css'
import Select from 'react-select'
import Map from '../components/Map'
import Legend from '../components/Legend'
import { Container, Row, Col} from 'reactstrap';
import CustomFilter from '../components/CustomFilter'
import Breakpoint, { BreakpointProvider } from 'react-socks'


const options = [
    {value: 'current', label: 'Trenutno stanje'},
    { value: 'all', label: 'Kritični odseki' }
];


class SimpleMap extends Component {
    constructor(props){
        super(props)
        this.mapElement = React.createRef();
        this.legendElement = React.createRef();
        this.customFilter = React.createRef();
        this.state = {
            selectedOption: 'all',
        }

        ;
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange = (selectedOption) => {
        this.mapElement.current.changeOption(selectedOption)
        this.setState({selectedOption: selectedOption });
        let visi = selectedOption.value === 'all'? 'visible': 'hidden'
        console.log(selectedOption)
        console.log(visi)
        this.customFilter.current.changeVisibility(visi)

    };

    handleLegendChange = (newLegend) => {
        this.mapElement.current.changeCriticalLevel(newLegend)
    }

    handleFilterSubmit = (state,surface) => {
        this.mapElement.current.changeFilterOptions(state,surface)
    }
    render() {
        const { selectedOption } = this.state;

        return (
            // Important! Always set the container height explicitly

            <Container fluid={true}>
                <Row>
                    <Col md="2" sm={"2"} xs="3">
                        <div align={"left"}>
                            <Select
                                defaultValue = {options[0]}
                                onChange={this.handleChange}
                                options={options}
                            />
                            <br/>
                            <Legend
                            ref = {this.legendElement}
                            change = {this.handleLegendChange}
                            />
                            <CustomFilter
                                change = {this.handleFilterSubmit}
                                ref = {this.customFilter}
                            />
                        </div>
                        <br/>
                    </Col>
                    <Col md="10" sm={"10"} xs={"9"}>
                        <Map
                            option = {this.state.selectedOption}
                            ref={this.mapElement}
                        />
                    </Col>
                </Row>
            </Container>


        );
    }
}

export default SimpleMap;