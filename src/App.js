import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

class App extends Component{
  state={
    data:[],
    modalInsertar:false,
    form:{
      name:'',
      lastname:'',
      username:'',
      password:''
    }
  }
  peticionGet=()=>{
    firebase.child('users').on('value', user=>{
      if(user.val()!==null){
        // eslint-disable-next-line no-undef
        this.setState({...data, data:user.val()})
      }
      else{
        this.setState({data:[]})
      }
    })
  }

  handleChange=e=>{
    this.setState({
      form:{
        [e.target.name]:e.target.value
      }
    })
    console.log(this.state.form)
  }

  render(){
    return(
      <div className='App'>
<div className='button' onClick={()=>this.setState({modalInsertar:true})}>Insertar</div>
<br></br>
<table className='table table-bordered'>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Nombre de usuario</th>
      <th>Contraseña</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(this.state.data).map(element=>{
      return(
        <tr key={element}>
          <td>
            {this.state.data[element].name}
          </td>
          <td>
            {this.state.data[element].lastname}
          </td>
          <td>
            {this.state.data[element].username}
          </td>
          <td>
            {this.state.data[element].password}
          </td>
        </tr>
      )
    })}
  </tbody>
</table>
<Modal>
  <ModalHeader>Ingresar Usuario</ModalHeader>
  <ModalBody>
    <div className='form-group'>
      <label>Nombre:</label>
      <br/>
      <input type='text' className='form-control' placeholder='Nombre' name='name' onChange={this.handleChange}></input>
      <label>Apellido:</label>
      <br/>
      <input type='text' className='form-control' placeholder='Apellido' name='lastname' onChange={this.handleChange}></input>
      <label>Nombre de usuario:</label>
      <br/>
      <input type='text' className='form-control' placeholder='Nombre de ususario' name='username' onChange={this.handleChange}></input>
      <label>Contraseña:</label>
      <br/>
      <input type='text' className='form-control' placeholder='Contraseña' name='password' onChange={this.handleChange}></input>
    </div>
  </ModalBody>
  <ModalFooter>
    <button className='btn btn-primary'>Insertar</button>
    <button className='btn btn-danger'>Cancelar</button>
  </ModalFooter>
</Modal>
      </div>
    )
  }
}

export default App;
