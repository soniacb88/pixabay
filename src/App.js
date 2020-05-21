import React, { Component } from 'react';
import "bootswatch/dist/solar/bootstrap.min.css";
import Buscador from './componentes/Buscador';
import Resultado from "./componentes/Resultado";

class App extends Component {

  state = {
    termino: "",
    imagenes: [],
    pagina: ""
  }

  scroll = () => {
    const elemento = document.querySelector(".jumbotron")
    elemento.scrollIntoView("smooth", "start")
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;

    if (pagina === 1) return null;
    pagina--;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina++;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino
    const pagina = this.state.pagina
    const url = `https://pixabay.com/api/?key=16669600-fede2f86f6cf3798b7131071d&q=${termino}&per_page=30&page=${pagina}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))


  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi()
    })
  }
  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">
            Buscador de Imágenes
    <Buscador
              datosBusqueda={this.datosBusqueda}
            />
          </p>
        </div>
        <div className="row justify-content-center">

          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}


export default App;
