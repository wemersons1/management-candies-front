import React, { useState, useEffect, useContext, useMemo } from 'react';
import Table from "../../../../components/Table";
import Message from "../../../../components/Message";
import Spinner from "../../../../components/Spinner";
import { Modal } from 'react-bootstrap';
import Button from "../../../../components/Button";
import SweetAlert from "../../../../components/SweetAlert";
import api from '../../../../services/api';
import AppContext from '../../../../AppContext/Context';
import { Row, Col } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Input from '../../../../components/Input';

const Categories = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [sweetShow, setSweetShow] = useState(false);
    const [sweetType, setSweetType] = useState('success');
    const [sweetText, setSweetText] = useState('');
    const [sweetTitle, setSweetTitle] = useState('');
    const [show, setShow] = useState(false);
    const { token } = useContext(AppContext);
    const [name, setName] = useState('');
    const [getCategories, setGetCategories] = useState(true);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        api.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setCategories(response.data);
            setLoading(false);
        });

    }, [token, getCategories]);

    const onClose = () => {
        setSweetShow(false);
        setGetCategories(!getCategories);
    }
  
    const columns = useMemo(() => [
        {
            Header: 'id',
            accessor: 'id',
        },
        {
            Header: 'Nome',
            accessor: 'name',
        },
        {
            Header: 'Criado em',
            accessor: 'created_at',
        },
        {
            Header: 'Ação',
            Cell: (row) => (
                <>
                    <button style={{ backgroundColor: 'transparent' }}
                        onClick={() => {
                            getCategory(row.row.original.id);
                            setCategoryId(row.row.original.id);
                            setShow(true);
                        }}
                    >
                        <FaEdit size={20} />
                    </button>
                    <Button
                        type={'destroy'}
                        onClick={() => {
                            deleteCategory(row.row.original.id);
                        }}
                    >
                    </Button>
                </>
            ),
        }
  
    ], []);

    const updateCategory = (id) => {
        const data = {name};
        api.put('/categories/' + categoryId, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Categoria atualizada com sucesso');
            setSweetTitle('Sucesso');        
            setGetCategories(!getCategories);
            setShow(false);
            setName('');
        });
    }

    const getCategory = (id) => {
        api.get('/categories/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setName(response.data.name);
        });
    }

    const createCategory = () => {
        const data = {name};
        api.post('/categories', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Categoria cadastrada com sucesso');
            setSweetTitle('Sucesso');        
            setShow(false);
            setName('');
        });
    }

    const deleteCategory = (id) => {
        api.delete('/categories/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Categoria deletada com sucesso');
            setSweetTitle('Sucesso');        
            setShow(false);
            setName('');
        });
       
    }

    if (loading) return (<Spinner />);

    return (
        <>
            <Row>
                <Col md={9}>
                    <h1>Categorias</h1>
                </Col> 
                <Col md={3}>
                    <Button
                        onClick={() => {
                            setShow(true);
                            setCategoryId(null);
                        }}
                    >Novo</Button>     
                </Col> 
            </Row>

            {
                categories.length ? <Table columns={columns} data={categories} /> :
                    <Message type={'info'}>Nenhuma categoria registrada</Message>
            }

            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setShow(false)} animation={true}
                style={{ textAlign: "center" }}
            >
                <Modal.Header closeButton={() => setShow(false)}>
                    <Modal.Title style={{ width: "100%" }} id="contained-modal-title-vcenter">

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Input
                        placeholder={'Nome da categoria'}
                        label={'Nome'}
                        required
                        onChange={e => setName(e.target.value)}
                        value={name}
                        type={'text'}
                    />
                   
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={() => {
                        if(!categoryId) {
                            createCategory();
                        } else {
                            updateCategory();
                        }
                    }}>Salvar alterações</Button>

                </Modal.Footer>
            </Modal>

            <SweetAlert
                onConfirm={onClose}
                title={sweetTitle}
                type={sweetType}
                btnConfirmStyle={'success'}
                text={sweetText}
                show={sweetShow}
                confirmBtnText={'Ok'}
                closeOnClickOutside={false}
            />



        </>
    );
}

export default Categories;
