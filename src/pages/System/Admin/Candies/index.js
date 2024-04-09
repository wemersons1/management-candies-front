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
import Select from '../../../../components/Select';
import InputMoney from '../../../../components/InputMoney';

const Candies = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [candies, setCandies] = useState([]);
    const [sweetShow, setSweetShow] = useState(false);
    const [sweetType, setSweetType] = useState('success');
    const [sweetText, setSweetText] = useState('');
    const [sweetTitle, setSweetTitle] = useState('');
    const [show, setShow] = useState(false);
    const { token } = useContext(AppContext);
    const [getCandies, setGetCandies] = useState(true);
    const [candyId, setCandyId] = useState(null);
    const [image, setImage] = useState(null);
    const initialStateCandy = {
        name: '',
        quantity: 0,
        price: 0,
        category_id: 0,
        image: null
    };
    const [candy, setCandy] = useState(initialStateCandy);

    const getCandiesData = async response => {

        return new Promise(async (resolve, reject) => {
            const candiesData = [];
            const lengthData = response.data.length;

            if(!lengthData) {
                resolve([]);
            }
        
             response.data.forEach(async item => {
                const response = await api.get(`${process.env.REACT_APP_API_URL}candies/image?filename=${item.image}`);
                const image = response.data.candy_image;
                candiesData.push({
                    ...item,
                    image,
                    price: parseFloat(item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
                });

                if(candiesData.length === lengthData) {
                    resolve(candiesData);
                }
            });

     
        });
    }

    const getCategories = () => {
        api.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            response.data.unshift({id: 0, name: 'Selecione'});
            setCategories(response.data);
        });
    }

    useEffect(() => {
        api.get('/candies', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async response => {
            const candiesData = await getCandiesData(response);
            setCandies(candiesData);
            
        }).finally(() => {
            setLoading(false);
        });

    }, [token, getCandies]);

    const onClose = () => {
        setSweetShow(false);
        setGetCandies(!getCandies);
    }
  
    const columns = useMemo(() => [
        {
            Header: 'Imagem',
            Cell: (row) => {
                return (
                    <>
                    <img width={'15%'} alt={`imagem ${row.row.original.name}`} src={`${row.row.original.image}`}/>
                    </>
                );
            },
        },

        {
            Header: 'id',
            accessor: 'id',
        },
        {
            Header: 'Nome',
            accessor: 'name',
        },
        {
            Header: 'Quantidade',
            accessor: 'quantity',
        },
        {
            Header: 'Valor',
            accessor: 'price',
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
                            getCandy(row.row.original.id);
                            setCandyId(row.row.original.id);
                            if(!categories.length) {
                                getCategories();
                            }
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
  
    ], [token, candies]);

    const handleChanged = e => {
        const {name, value} = e.target;
        
        setCandy({
            ...candy,
            [name]: value
        });
    }
    const updateCandy = (id) => {
        const data = new FormData();
        data.append('name', candy.name);
        data.append('quantity', candy.quantity);
        data.append('category_id', candy.category_id);
        data.append('price', candy.price);
        if(image) {
            data.append('image', image);   
        } 

        api.put('/candies/' + candyId, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Doce atualizado com sucesso');
            setSweetTitle('Sucesso');        
            setGetCandies(!getCandies);
            setShow(false);
            setCandy(initialStateCandy);
            setImage(null);
        });
    }

    const renderCategoriesOptions = () => {
        
        return categories.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        });
    }

    const getCandy = (id) => {
        api.get('/candies/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setCandy(response.data);
        });
    }

    const createCandy = () => {
        const data = new FormData();
        data.append('name', candy.name);
        data.append('quantity', candy.quantity);
        data.append('category_id', candy.category_id);
        data.append('price', candy.price);
        if(image) {
            data.append('image', image);   
        }       
        api.post('/candies', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Doces cadastrado com sucesso');
            setSweetTitle('Sucesso');        
            setShow(false);
            setCandy(initialStateCandy);
            setImage(null);
        });
    }

    const deleteCategory = (id) => {
        api.delete('/candies/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }, 
        }).then(response => {
            setSweetShow(true);
            setSweetType('success');
            setSweetText('Doce deletado com sucesso');
            setSweetTitle('Sucesso');        
            setShow(false);
            setCandy(initialStateCandy);
            setImage(null);
        });
       
    };

    if (loading) return (<Spinner />);

    return (
        <>
            <Row>
                <Col md={9}>
                    <h1>Doces</h1>
                </Col> 
                <Col md={3}>
                    <Button
                        onClick={() => {
                            if(!categories.length) {
                                getCategories();
                            }
                            setShow(true);
                            setCandyId(null);
                        }}
                    >Novo</Button>     
                </Col> 
            </Row>

            {
                candies.length ? <Table columns={columns} data={candies} /> :
                    <Message type={'info'}>Nenhum doce registrado</Message>
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

                <Row>
                    <Col md={6}>
                        <Input
                            placeholder={'Nome'}
                            label={'Nome'}
                            required
                            name={'name'}
                            onChange={handleChanged}
                            value={candy.name}
                            type={'text'}
                        />
                    </Col>
                    <Col md={6}>
                        <Input
                            className={'text-center'}
                            label={'Quantidade'}
                            name={'quantity'}
                            onChange={handleChanged}
                            value={candy.quantity}
                            min={0}
                            type={'number'}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>

                    <InputMoney
                            className={'border'}
                            label={'Preço'}
                            value={candy.price}
                            onChange={(e, value) => {

                                let eTreated = {
                                    target: {
                                        name: "price",
                                        value: value
                                    }
                                }

                                handleChanged(eTreated)

                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <Select
                            placeholder={'Categoria'}
                            label={'Categoria'}
                            name={'category_id'}
                            onChange={handleChanged}
                            value={candy.category_id}
                        >
                            {renderCategoriesOptions()}
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                            <Input
                                label={'Imagem'}
                                id={'image'}
                                type={'file'}
                                onChange={e => {
                                    setImage(e.target.files[0]);
                                }}
                                placeholder={image ? 'Arquivo selecionado' : 'Selecione um documento'}
                            />
                        </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={() => {
                        if(!candyId) {
                            createCandy();
                        } else {
                            updateCandy();
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

export default Candies;
