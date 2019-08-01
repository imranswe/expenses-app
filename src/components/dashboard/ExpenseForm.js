import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';

export default class ExpenseForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    };

    onDescriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(() => ({description: description}));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        //this.setState(() => ({note: note}));
        this.setState(() => ({note}));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            //this.setState(() => ({amount: amount}));
            this.setState(() => ({amount}));
        }
    };
    onDateChange = (date) => {
        
        if(date){
            this.setState(() => ({createdAt: date}));
        }
    };
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description && !this.state.amount){
            this.setState(() => ({error: 'Desciption and amount are required'}));
        } 
        else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10),
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    };
    render(){
        const { error } = this.props;
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                type="text"
                placeholder="Description"
                autoFocus
                className="text-input"
                value={this.state.description}
                onChange={this.onDescriptionChange}
                />
                <input
                type="text"
                placeholder="Amount"
                className="text-input"
                value={this.state.amount}
                onChange={this.onAmountChange}
                />
                <SingleDatePicker
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                />
                <textarea
                placeholder="Add a note for your expense (optional)"
                className="textarea"
                value={this.state.note}
                onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                <button className="button">Save Expense</button>
                </div>
            </form>
        );
    };
};