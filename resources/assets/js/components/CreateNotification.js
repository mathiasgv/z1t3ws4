import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

let uri = 'http://localhost:3000/notifications';

function updateState(notifications){
    this.setState({notifications});
}

class DisplayNotification extends Component {
  constructor(props) {
       super(props);
       this.state = {value: '', notifications: ''};
       updateState = updateState.bind(this);
     }
     componentDidMount(){
       axios.get(uri)
       .then(response => {
         this.setState({ notifications: response.data.data });
       })
       .catch(function (error) {
         console.log(error);
       })
     }
     tabRow(){
       if(this.state.notifications instanceof Array){
         return this.state.notifications.map(function(object, i){
             return <TableRow obj={object} key={i} />;
         })
       }
     }

  render(){
    return (
      <div className="container">
        <h1>Notifications</h1>
        <table className="table table-hover">
            <thead>
            <tr>
                <td><strong>ID</strong></td>
                <td><strong>Title</strong></td>
            </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
        </table>
    </div>
    )
  }
}

class CreateNotification extends Component {
  constructor(props){
    super(props);
    this.state = {title: '',notifications: '',message: '',isMessage: false};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange1(e){
    this.setState({
      title: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const products = {
      title: this.state.title
    }
    axios.post(uri, products).then((response) => {
      this.updateChild(response.data.data);
      this.setState({title: ''});
      this.setState({message: response.data.message});
      this.setState({isMessage: true});
      setTimeout(function() { this.setState({isMessage: false}); }.bind(this), 8000);
    });
  }

  updateChild(notifications) {
    updateState(notifications);
  }

    render() {
       const alert = (this.state.isMessage == true) ? (
          <div className="alert alert-success" id="success-alert">
            {this.state.message}
          </div>
        ) : "" ;
      return (
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-3 offset-md-1">
            <h1>Add Notification</h1>
            {alert}
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control" required value= {this.state.title} onChange={this.handleChange1}/>
                  </div>
                </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Save</button>
                </div>
            </form>
          </div>
          <div className="col-md-7 col-xs-offset-right-1">  
            <DisplayNotification />
          </div>
        </div>
      </div>
    )
  }
}
export default CreateNotification;
