import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100vw;
  padding: 0 7rem; /* Add padding for left and right gap */
  background: linear-gradient(to bottom, #4facfe, #00f2fe);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
  box-sizing: border-box; /* Ensure padding is included in the total width */
`;

const ContentWrapper = styled.div`
  max-width: 768px;
  width: 100%;
  padding: 2rem;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: #f0f0f0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: #4a90e2;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;
  transition: background 0.3s;
  &:hover {
    background: #357ab8;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const ListItemText = styled.span`
  font-size: 1rem;
  color: #333;
`;

const ListItemDate = styled.span`
  font-size: 0.875rem;
  color: #999;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: #666;
`;

const FooterLink = styled.a`
  color: #4a90e2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Contest = () => {
  return (
    <Container>
      <ContentWrapper>
        <Title>Contest Page</Title>
        <Grid>
          <Card>
            <CardTitle>Upcoming Contest</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in erat cursus volutpat.</CardDescription>
            <Button>Join Contest</Button>
          </Card>
          <Card>
            <CardTitle>Previous Contests</CardTitle>
            <List>
              <ListItem>
                <ListItemText>Contest Name 1</ListItemText>
                <ListItemDate>Date: 2024-06-29</ListItemDate>
              </ListItem>
              <ListItem>
                <ListItemText>Contest Name 2</ListItemText>
                <ListItemDate>Date: 2024-06-28</ListItemDate>
              </ListItem>
              <ListItem>
                <ListItemText>Contest Name 3</ListItemText>
                <ListItemDate>Date: 2024-06-27</ListItemDate>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Footer>
          <p>Explore more contests and challenges!</p>
          <FooterLink href="/all-contests">View All Contests</FooterLink>
        </Footer>
      </ContentWrapper>
    </Container>
  );
};

export default Contest;
