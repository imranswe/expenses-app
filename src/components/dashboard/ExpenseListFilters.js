import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';

import {setTextFilter,sortByAmount, sortByDate,setStartDate, setEndDate} from '../../actions/filters';

class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null
    };
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}));
    };
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };
    render(){
        
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text" className="text-input" value={this.props.filters.text} onChange={this.onTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select className="select" onChange={(e) =>{
                            let value = e.target.value;
                            if(value === 'date'){
                                this.props.dispatch(sortByDate());
                            }
                            else if(value === 'amount'){
                                this.props.dispatch(sortByAmount());
                            }
                        }}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                        startDate={this.props.filters.startDate}
                        startDateId="start_date"
                        endDateId="end_date"
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        showClearDates={true}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters);