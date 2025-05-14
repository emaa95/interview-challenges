import { Button, Divider, Flex, Form, FormProps, Input, List, Typography } from 'antd'
import './App.css'
import Title from 'antd/es/typography/Title'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import deleteIcon from './assets/archivo-bin.png';

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemId,
  timestamp: number,
  text: string
}

const INITIAL_ITEMS: Item[] = [
  { 
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Videojuegos :D'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros XD'
  }
]

type FieldType = {
  text?: string
}


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [form] = useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!values.text) return 
    
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: values.text,
      timestamp: Date.now()
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    form.resetFields();
  }

  const createHandleRemoveItem = (id: ItemId) => () => {
    setItems(prevItems => {
      return prevItems.filter(currentItem => currentItem.id != id)
    })
  }

  return (
    <main>
      <Title style={{margin:0}}>Prueba técnica React</Title>
      <Flex justify='space-around' align='center'>
        <Flex vertical align='center'>
         
          <Title level={2}>Añadir y eliminar elementos de la lista</Title>
          <Form 
            form={form}
            name='basic' 
            aria-label='Añadir elementos a la lista'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
              
              <Form.Item<FieldType>
                label="Text"
                name="text"
                rules={[{ required:true, message:'Por favor ingrese una cadena de texto!'}]}
              >
                <Input placeholder='Escribe algo...'/>
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
          </Form>
        </Flex>
        <Divider type='vertical'>

        </Divider>
        <Flex>
          { items.length == 0 ? 
            <p>
              <strong>La lista esta vacia</strong>
            </p> :
          <List header={<div>Lista de items</div>} bordered dataSource={items}
            renderItem={(item) => (
              <List.Item key={item.id}>
                {item.text} <Button   icon={<img src={deleteIcon} alt="delete" style={{ width: 16, height: 16 }} />} iconPosition='end' size='small' onClick={createHandleRemoveItem(item.id)}
              >Eliminar</Button>
              </List.Item>
            )}>
          </List>
          }
        </Flex>
      </Flex>
    </main>
  )
}

export default App


