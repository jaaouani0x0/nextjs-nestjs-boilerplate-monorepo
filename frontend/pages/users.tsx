/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Typography, Box, ListItem, Avatar,  Grid } from '@mui/material';
import useSWR from "swr";
import fetcher from "../src/fetcher";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { List } from "@material-ui/core";

type Props = {
  data: any;
  error: string;
};

type User = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const Users = (props: Props) => {
  const { data: initDataComingFromSSR } = props;
  const { t } = useTranslation(['common', 'homepage']);
  const { data: livenessData } = useSWR('/api/users', fetcher, {
    fallbackData: initDataComingFromSSR,
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }} css={css`text-align: center;`}>
        <Container>
          <List>
            { livenessData && livenessData.map((user: User) => 
              (<ListItem key={`${Math.random()*10}_${user.email}`} sx={{ flexDirection: 'row' }}>
                <Avatar alt={`${user.firstName} ${user.lastName}`}
                  src={`https://eu.ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                  sx={{ width: 24, height: 24 }}/>
                <Grid item xs zeroMinWidth>
                  <Typography sx={{ marginLeft: 2}}>{`${user.firstName} ${user.lastName}`}</Typography>
                  <Typography sx={{ marginLeft: 2, fontSize: '0.8rem'}}>{`${user.email}`}</Typography>
                  <Typography sx={{ marginLeft: 2, fontSize: '0.72rem'}}>{`${user.phone}`}</Typography>
                </Grid>
              </ListItem>))}
          </List>
        </Container>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const locale: string = context.locale ? context.locale : 'en';
  return {
    props: {...await serverSideTranslations(locale, ['common', 'homepage'])},
  }
}

export default Users;
