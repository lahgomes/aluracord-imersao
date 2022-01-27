import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListaDeMensagens(data);    
            });
    }, []);
    
    
    function handleNovaMensagem(novaMensagem) {
      const mensagem = {          
        de: 'lahgomes',
        texto: novaMensagem,
      };

      supabaseClient
        .from('mensagens')
        .insert([
            mensagem
        ])
        .then(({ data }) => {
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
            ]);
        });

      setMensagem('');
    }

    function handleDeleteMessage(id) {
        supabaseClient
        .from('mensagens')
        .delete()
        .match({id:id})
        .then(({ data }) => {
            const mensagemfiltrada = listaDeMensagens.filter((item) => item.id !== data[0].id)
            setListaDeMensagens(mensagemfiltrada)
        })

    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images.unsplash.com/photo-1638285852084-e4add189d132?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '90%',
                    maxWidth: '80%',
                    maxHeight: '90vh',
                    padding: '32px',
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} handleDeleteMessage={handleDeleteMessage} />
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',                            
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            styleSheet={{
                                padding: '12px',
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                hover: {
                                backgroundColor: appConfig.theme.colors.primary[700],
                                }
                            }}
                            onClick={() => handleNovaMensagem(mensagem)}
                            label='Enviar'                              
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text 
                    variant='heading5'
                    styleSheet={{
                        textTransform: 'uppercase',                                           
                    }}
                >
                    Chat
                </Text>
                <Button
                    styleSheet={{
                        color: appConfig.theme.colors.primary['050'],
                        hover: {
                        backgroundColor: appConfig.theme.colors.primary['700'],
                        }
                    }}
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) { 
  console.log('mensagens', props.mensagens)   
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                              backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                              marginBottom: '8px',
                              position: 'relative'
                            }}
                        >
                            <Image
                                styleSheet={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  display: 'inline-block',
                                  marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                  fontSize: '10px',
                                  marginLeft: '8px',
                                  color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                              styleSheet={{
                                position: 'relative',
                                left: '20px',                                
                                hover: {
                                backgroundColor: appConfig.theme.colors.primary[700],
                                }
                            }}                                   
                                onClick={() => props.handleDeleteMessage(mensagem.id)}
                                variant='tertiary'
                                colorVariant='neutral'
                                label='Delete'                              
                            />
                        </Box>
                        {mensagem.texto}
                    </Text>
                );
            })}
        </Box>
    )
}
