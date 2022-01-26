import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React, { useState } from "react";
import { useRouter } from "next/router";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
          text-shadow: 2px 2px ${appConfig.theme.colors.primary["700"]};
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  //const username = "PatriciaLengert";
  const [username, setUsername] = useState('PatriciaLengert');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.neutrals["000"],
          backgroundImage:
            "url(https://i.pinimg.com/originals/b9/58/0d/b9580d22ef5b75e54c7972d2174d402a.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "8px",
            padding: "32px",
            margin: "16px",
            backgroundColor: "rgba(0,0,0,0.85)",
            border: `solid 1px ${appConfig.theme.colors.primary[700]}`,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (ev) {
              ev.preventDefault();
              console.log("Form submetido");
              //Roteamento direto pelo react
              //window.location.href = './chat'
              //Roteamento usando netx/routers
              roteamento.push("./chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Welcome to my Galaxy!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginTop: "5px",
                marginBottom: "35px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function Handler(ev) {
                //console.log("usuário digitou", ev.target.value);
                //Onde está o valor?
                const valor = ev.target.value;
                //Trocar o valor da variável
                setUsername(valor);
              }}
              fullWidth
              styleSheet={{
                marginBottom: "5px",
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[500],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              border: "1px solid",
              backgroundColor: "rgba(33,41,49,0.7)",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={
                username.length > 2
                  ? `https://github.com/${username}.png`
                  : "https://uploaddeimagens.com.br/images/003/646/403/full/avatar.png?1643127205"
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[800],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
