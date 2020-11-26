import React, { Component } from 'react';
import {
  Form, FormGroup, Input, FormFeedback, Button, Label, Col, ModalHeader, Modal, ModalBody, ModalFooter
} from 'reactstrap';

class AddFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      element: '',
      touched: {
        element: false,
      }
    }
  }
  validate = (element) => {
    const errors = {
      element: '',
    };

    if (this.state.touched.element && element.length < 3)
      errors.element = 'Element Name should be >= 3 characters';
    else if (this.state.touched.element && element.length > 30)
      errors.element = 'Element Name should be <= 30 characters';
    return errors;
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  mandarGeom = () => {
    this.props.sendGeom(this.state.element);
    this.props.cerrarModal();
  }

  render() {
    const errors = this.validate(this.state.element);
    return (
      <Modal isOpen={true}>
        <ModalHeader toggle={this.props.cerrarModal}>Agregar Punto Favorito</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row className="justify-content-center">
              <Label htmlFor='element' md={12}>Nombre del punto</Label>
              <Col md={12}>
                <Input type='text' id='element' name='element'
                  placeholder='Nombre del punto' value={this.state.element}
                  onChange={this.handleInputChange}
                  placeholder="Nombre del punto"
                  value={this.state.element}
                  valid={errors.element === '' && this.state.element !== ''}
                  invalid={errors.element !== ''}
                  onBlur={this.handleBlur('element')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.element}</FormFeedback>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={this.mandarGeom} block>Agregar</Button>
        </ModalFooter>
      </Modal>
    );

  }
}

export default AddFeature;