import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

function Titulo (props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag> 
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['100']};
          font-size: 24px;
          font-weight: 600;
        }                
      `}</style>   
    </>
  );
}

export default function PaginaInicial() {
  
  const [username, setUsername] = React.useState('lahgomes');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://images.unsplash.com/photo-1638285852084-e4add189d132?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              roteamento.push('/chat');             
            }}

            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[100] }}>
              {appConfig.name}
            </Text>
            
            <TextField
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                setUsername(valor);
              }}              

              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[500],
                  mainColor: appConfig.theme.colors.primary[100],
                  mainColorHighlight: appConfig.theme.colors.primary[700],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              disabled={username.length <= 2}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[700],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.neutrals[400],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}

          {username.length >= 3 && (
            <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.primary[700],               
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
            </Box>
          )}                    
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
