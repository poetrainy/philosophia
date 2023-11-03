import { useState } from 'react';
import { NextPage } from 'next';
import { Box, Center, Flex, Image, useMediaQuery } from '@chakra-ui/react';

import Layout from '@/components/Layout';

import { APP_PAGE_YEARS } from '@/constant/data';

import { client } from '@/libs/client';

import { MicroCMSArticleType } from '@/types/microCMS';

type Props = {
  microCMSData: MicroCMSArticleType[];
};

const Photo: NextPage<Props> = ({ microCMSData }) => {
  const [isSP] = useMediaQuery('(max-width: 480px)');
  const [selected, setSelected] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState(0);

  const onModal = () => {
    setIsModal(!isModal);
  };
  const modalFunc = (i: number) => {
    setSelected(i);
    setModalIndex(0);
    onModal();
  };

  const selectModalIndex = (i: number) => {
    setModalIndex(i);
  };

  const next = () => {
    modalIndex + 1 === microCMSData[selected].images.length
      ? setModalIndex(0)
      : setModalIndex(modalIndex + 1);
  };
  const prev = () => {
    modalIndex === 0
      ? setModalIndex(microCMSData[selected].images.length - 1)
      : setModalIndex(modalIndex - 1);
  };

  const Back = () => {
    return (
      <Center
        onClick={() => setIsModal(!isModal)}
        w="56px"
        h="56px"
        zIndex={60}
        pos="absolute"
        inset={{ base: '3% 3% auto auto', sm: '10% 10% auto auto' }}
        _hover={{
          '&::before': {
            background: 'black300',
          },
          '&::after': {
            background: 'black300',
          },
        }}
        sx={{
          '&::before': {
            content: '""',
            display: 'block',
            width: '1px',
            height: '64px',
            background: 'black600',
            transition: '0.2s background-color',
            boxShadow: '0 0 10px $white',
            transform: 'rotateZ(45deg)',
          },
          '&::after': {
            content: '""',
            display: 'block',
            width: '1px',
            height: '64px',
            background: 'black600',
            transition: '0.2s background-color',
            boxShadow: '0 0 10px $white',
            transform: 'rotateZ(135deg)',
          },
        }}
      />
    );
  };

  return (
    <>
      <Layout>
        <Flex
          as="ul"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="center"
          gap={{ base: '2px', sm: '16px' }}
          m="0 auto"
          sx={{
            '@media screen and (min-width: 1081px)': {
              width: 'calc(320px * 3 + 16px * 2)',
            },
            '@media screen and (max-width: 1120px)': {
              width: 'calc(320px * 2 + 16px * 1)',
            },
            '@media screen and (max-width: 980px)': {
              width: 'calc(320px * 2 + 16px * 1)',
            },
            '@media screen and (max-width: 800px)': {
              width: '320px',
            },
            '@media screen and (max-width: 480px)': {
              width: '100vw',
            },
          }}
        >
          {microCMSData.map((item: MicroCMSArticleType, i) => (
            <Center
              as="li"
              key={item.contentId + item.alt}
              onClick={() => modalFunc(i)}
              overflow="hidden"
              aspectRatio={1}
              sx={{
                ...(isSP
                  ? {
                      width: 'calc((100vw - 2px * 2) / 3)',
                      aspectRatio: 1,
                      opacity: 1,
                      transition: '0.6s opacity',
                      '&:hover': {
                        opacity: 0.7,
                      },
                    }
                  : {
                      width: '320px',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        background: 'black800',
                        position: 'absolute',
                        inset: '0 auto auto 0',
                        opacity: 0.7,
                        transition: '0.2s opacity',
                        mixBlendMode: 'hue',
                        zIndex: 2,
                      },
                      '&:hover': {
                        '&::before': {
                          opacity: 0,
                        },
                      },
                    }),
              }}
              _hover={{
                img: {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Image
                src={`${item.images[0].url}?${
                  item.images[0].width > item.images[0].height ? 'w' : 'h'
                }=400`}
                alt={item.alt}
                w="100%"
                h="100%"
                transform="scale(1)"
                objectFit="cover"
                transition="0.6s transform"
              />
            </Center>
          ))}
        </Flex>
      </Layout>
      <Center
        flexDir="column"
        gap={{ base: '16px', sm: '24px' }}
        w="100vw"
        h="100vh"
        pos="fixed"
        inset="0 0 0 0"
        bgColor="rgba(255, 255, 255, 0.9)"
        zIndex={50}
        transition="opacity 0.2s"
        sx={{
          ...(isModal
            ? {
                opacity: 1,
                pointerEvents: 'auto',
              }
            : {
                opacity: 0,
                pointerEvents: 'none',
              }),
        }}
      >
        <Back />
        <Center
          as="ul"
          w={{ base: '100vw', sm: '90vw', md: '70vw', lg: '60vw' }}
          h={{
            base: '120vw',
            // base: '60vh',
            sm: 'calc(90vw / 3 * 2)',
            md: 'calc(70vw / 3 * 2)',
            lg: 'calc(60vw / 3 * 2)',
          }}
          pos="relative"
        >
          {microCMSData[selected].images.map((item, i) => (
            <Center
              as="li"
              key={item.url}
              flexDir="column"
              w="100%"
              h="100%"
              pos="absolute"
              transition="opacity 0.2s"
              opacity={i === modalIndex ? 1 : 0}
            >
              <Box
                as="img"
                src={`${item.url}?${item.width > item.height ? 'w' : 'h'}=1200`}
                w="100%"
                h="100%"
                objectFit="contain"
                transition="opacity 0.2s"
                opacity={i === modalIndex ? 1 : 0}
              />
            </Center>
          ))}
        </Center>
        {/* microCMSData */}
        <Flex
          display={{ base: 'grid', sm: 'flex' }}
          w={{
            base: 'calc(120vw / 3 * 2)',
            sm: '80vw',
            md: '70vw',
            lg: '60vw',
          }}
          sx={{
            ...(isSP
              ? {
                  gridTemplateColumns: '50% 50%',
                  gridTemplateRows: 'auto auto',
                  gap: '24px 0',
                  fontSize: '1.3rem',
                }
              : {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.4rem',
                  minHeight: '48px',
                }),
          }}
        >
          {/* Date */}
          <Flex
            alignItems="center"
            w={{ sm: '20%' }}
            sx={{
              ...(isSP && {
                gridColumn: 1,
                gridRow: 2,
              }),
            }}
          >
            {microCMSData[selected].date.split('T')[0]}
          </Flex>
          {/* Circle */}
          <Center
            gap="12px"
            sx={{
              ...(isSP && {
                gridColumn: '1/3',
                gridRow: 1,
              }),
            }}
          >
            {microCMSData[selected].images.map((item, i) => (
              <Box
                w="12px"
                h="12px"
                background="black300"
                transition="0.2s background"
                borderRadius="9999px"
                onClick={() => selectModalIndex(i)}
                key={'array' + i}
                _hover={{
                  cursor: 'pointer',
                  background: 'black600',
                }}
                sx={{
                  ...(i === modalIndex && {
                    background: 'black600',
                  }),
                }}
              />
            ))}
          </Center>
          {/* Place */}
          <Flex
            justifyContent="flex-end"
            alignItems="center"
            w={{ sm: '20%' }}
            textAlign="right"
            sx={{
              ...(isSP && {
                gridColumn: 2,
                gridRow: 2,
              }),
            }}
          >
            {microCMSData[selected].place}
            {microCMSData[selected].prefecture && (
              <>, {microCMSData[selected].prefecture}</>
            )}
          </Flex>
        </Flex>
        {/* Operation */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w={{ base: '100vw', sm: '95vw' }}
          h="160px"
          pos="absolute"
          zIndex="50"
          m="auto"
          inset={{ base: 'auto 0 0 0', sm: '0 0 0 0' }}
        >
          <Center
            onClick={() => prev()}
            textStyle="modalArrow"
            transition="opacity 0.2s"
            sx={{
              ...(modalIndex === 0
                ? {
                    opacity: 0,
                    pointerEvents: 'none',
                  }
                : {
                    opacity: 1,
                    pointerEvents: 'auto',
                  }),
              '&::before': {
                content: '""',
                display: 'block',
                width: '1px',
                height: '40px',
                background: 'black600',
                margin: '0 0 28px',
                transition: '0.2s background',
                position: 'absolute',
                transform: 'rotateZ(45deg)',
              },
              '&::after': {
                content: '""',
                display: 'block',
                width: '1px',
                height: '40px',
                background: 'black600',
                margin: '28px 0 0',
                transition: '0.2s background',
                position: 'absolute',
                transform: 'rotateZ(135deg)',
              },
            }}
          />
          <Center
            onClick={() => next()}
            textStyle="modalArrow"
            sx={{
              ...(modalIndex === microCMSData[selected].images.length - 1
                ? {
                    opacity: 0,
                    pointerEvents: 'none',
                  }
                : {
                    opacity: 1,
                    pointerEvents: 'auto',
                  }),
              '&::before': {
                content: '""',
                display: 'block',
                width: '1px',
                height: '40px',
                background: 'black600',
                margin: '0 0 28px',
                transition: '0.2s background',
                position: 'absolute',
                transform: 'rotateZ(135deg)',
              },
              '&::after': {
                content: '""',
                display: 'block',
                width: '1px',
                height: '40px',
                background: 'black600',
                margin: '28px 0 0',
                transition: '0.2s background',
                position: 'absolute',
                transform: 'rotateZ(45deg)',
              },
            }}
          />
        </Flex>
      </Center>
    </>
  );
};

export default Photo;

export const getStaticPaths = async () => {
  const paths = APP_PAGE_YEARS.map((item) => ({
    params: { id: String(item) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const microCMSReturnData = await client.get({
    endpoint: 'data',
    queries: {
      offset: 0,
      limit: 100,
    },
  });

  const path = Number(params.id);
  const microCMSData: MicroCMSArticleType[] =
    microCMSReturnData.contents.filter((item: MicroCMSArticleType) => {
      const contentDate = new Date(item.date);
      return contentDate.getFullYear() === path;
    });

  return {
    props: {
      microCMSData: microCMSData,
    },
  };
};
