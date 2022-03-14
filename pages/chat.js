import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker.js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNDQ2NSwiZXhwIjoxOTU4ODgwNDY1fQ.vuj-57OR-TiDRN2wV-Y9rDAmd6xBfe-0mpgg-7d4lPc";
const SUPABASE_URL = "https://syfjjhwfurfrkohfduyn.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagens(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (resposta) => {
      adicionaMensagem(resposta.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  //console.log(roteamento.query)
  //console.log('usuario', usuarioLogado)
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        //console.log(data);
        setListaDeMensagens(data);
      });

    escutaMensagens((novaMensagem) => {
      setListaDeMensagens((valorAtual) => {
        return [novaMensagem, ...valorAtual];
      });
    });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {});

    setMensagem("");
  }

  function handleDeletaMensagem(event) {
    const Id = Number(event.target.dataset.id);
    const listaFiltrada = listaDeMensagens.filter((mensagemFiltrada) => {
      return mensagemFiltrada.id != Id;
    });

    setListaDeMensagens(listaFiltrada);
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary["000"],
        backgroundImage: `url(https://i.pinimg.com/originals/b9/58/0d/b9580d22ef5b75e54c7972d2174d402a.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "90%",
          maxHeight: "90vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            mensagens={listaDeMensagens}
            handleDeletaMensagem={handleDeletaMensagem}
          />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                //console.log('[USANDO DO COMPONENTE] salvando sticker no banco', sticker)
                handleNovaMensagem(":sticker: " + sticker);
              }}
            />
            <Button
              onClick={() => handleNovaMensagem(mensagem)}
              label="Enviar"
              styleSheet={{
                borderRadius: '10px',
                  minWidth: "75px",
                  minHeight: "50px",
                  marginBottom: '8px', 
                }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
              }}
            />
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  const handleDeletaMensagem = props.handleDeletaMensagem;
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              wordBreak: "break-word",
              hover: {
                backgroundColor: "rgba( 0, 0, 0, 0.21 )",
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Text
                onClick={handleDeletaMensagem}
                styleSheet={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  color: "#FFF",
                  backgroundColor: appConfig.theme.colors.neutrals["700"],
                  width: "20px",
                  height: "20px",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                tag="span"
                data-id={mensagem.id}
              >
                X
              </Text>
            </Box>
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image src={mensagem.texto.replace(":sticker:", "")}
                styleSheet={{
                  maxWidth:"100px",
                  maxHeight:'100px',
                }}
              />
            ) : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}
