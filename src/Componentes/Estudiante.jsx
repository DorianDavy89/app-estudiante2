import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert } from 'reactstrap';
import '../styles/botones.css';

function Estudiante() {

    const datos_estudiantes = [
        { id: 1, cedula: "0912345678", nombre: "Rex", apellido: "Asecas" },
        { id: 2, cedula: "0974185296", nombre: "Lucas", apellido: "Cat" },
        { id: 3, cedula: "0996385274", nombre: "karol", apellido: "Jones" },
        { id: 4, cedula: "0998765423", nombre: "Rufo", apellido: "Ruso" },
    ];

    const [data, setData] = useState(datos_estudiantes);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState({ id: 0, cedula: "", nombre: "", apellido: "" });
    const [banderaEditar, setBanderaEditar] = useState(false);
    const [banderaEliminar, setBanderaEliminar] = useState(false);
    const [banderaInsertar, setBanderaInsertar] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");


    const seleccionarEstudiante = (elemento, tipo) => {
        setEstudianteSeleccionado(elemento);
        (tipo === 'Editar') && setBanderaEditar(true);
        (tipo === 'Eliminar') && setBanderaEliminar(true);
        (tipo === 'Insertar') && setBanderaInsertar(true);

    }

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setEstudianteSeleccionado((prevState) => (
            { ...prevState, [name]: value }
        ))
        console.log(estudianteSeleccionado);
    }

    const editarEstudiante = () => {
        var datos_nuevos = data;
        datos_nuevos.map(estudiante => {
            if (estudiante.id === estudianteSeleccionado.id) {
                estudiante.cedula = estudianteSeleccionado.cedula;
                estudiante.nombre = estudianteSeleccionado.nombre;
                estudiante.apellido = estudianteSeleccionado.apellido;
            }
        })

        setData(datos_nuevos);
        setBanderaEditar(false);
        setMensajeAlerta(`Estudiante ${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido} actualizado con exito`);
    }

    const eliminarEstudiante = () => {
        var nuevos_datos = data.filter(
            estudiante => estudiante.id !== estudianteSeleccionado.id
        );

        setData(nuevos_datos);
        setBanderaEliminar(false);
        setMensajeAlerta(`Estudiante ${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido} eliminado con exito`);

    }

    const crearEstudiante = () => {
        var estudiante_a_ingresar = estudianteSeleccionado;
        var nuevos_datos = data;
        estudiante_a_ingresar.id = nuevos_datos[nuevos_datos.length - 1].id + 1;
        nuevos_datos.push(estudiante_a_ingresar);
        setData(nuevos_datos);
        setBanderaInsertar(false);
        setMensajeAlerta(`Estudiante ${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido} ingresado con exito`);
    }

    return (
        <div>
            <h3>Listado Estudiantes</h3>
            <Button
                color='success'
                large='lg'
                onClick={() => seleccionarEstudiante(null, 'Insertar')}>
                Insertar
            </Button>
            <p>    </p>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(elemento => (
                            <tr>
                                <td>{elemento.id}</td>
                                <td>{elemento.cedula}</td>
                                <td>{elemento.nombre}</td>
                                <td>{elemento.apellido}</td>
                                <td>
                                    
                                        <button className="btn btn-primary"
                                            onClick={() => seleccionarEstudiante(elemento, 'Editar')}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger"
                                            onClick={() => seleccionarEstudiante(elemento, 'Eliminar')}>
                                            Eliminar
                                        </button>
                                   

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal isOpen={banderaEditar}>
                <ModalHeader>
                    <div>
                        <h3>Edicion Estudiante</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID</label>
                        <input className="form-control"
                            readOnly
                            type="text"
                            name='id'
                            value={estudianteSeleccionado && estudianteSeleccionado.id} />
                        <br />
                        <label>Cedula</label>
                        <input className='form-control'
                            type='text'
                            name='cedula'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado && estudianteSeleccionado.cedula} />
                        <br />
                        <label>Nombre</label>
                        <input className="form-control"
                            type="text"
                            name='nombre'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado && estudianteSeleccionado.nombre} />
                        <br />
                        <label>Apellido</label>
                        <input className="form-control"
                            type="text"
                            name='apellido'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado && estudianteSeleccionado.apellido} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary"
                        onClick={() => editarEstudiante()}>
                        Guardar
                    </button>
                    <button className="btn btn-danger"
                        onClick={() => setBanderaEditar(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={banderaEliminar}>
                <ModalBody>
                    ¿Está seguro de querer eliminar el resgistro del estudiante?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={() => eliminarEstudiante()}>
                        Si
                    </button>
                    <button className='btn btn-secondary'
                        onClick={() => setBanderaEliminar(false)}>
                        No
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={banderaInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Ingreso de Estudiante</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Id</label>
                        <input className='form-control'
                            readOnly
                            type='text'
                            name='id'
                            value={data[data.length - 1].id + 1}
                        />
                        <br />
                        <label>Cedula</label>
                        <input className='form-control'
                            type='text'
                            name='cedula'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado ? estudianteSeleccionado.cedula : ''}
                        />
                        <br />
                        <label>Nombre</label>
                        <input className='form-control'
                            type='text'
                            name='nombre'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado ? estudianteSeleccionado.nombre : ''}
                        />
                        <br />
                        <label>Apellido</label>
                        <input className='form-control'
                            type='text'
                            name='apellido'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado ? estudianteSeleccionado.apellido : ''}
                        />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={() => crearEstudiante()}>
                        Guardar
                    </button>
                    <button className='btn btn-danger'
                        onClick={() => setBanderaInsertar(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>

            <Alert color='primary'>
                {mensajeAlerta}
            </Alert>

        </div>
    )

}
export default Estudiante;
