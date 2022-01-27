import Link from 'next/link';

// fetch
import fetch from 'isomorphic-unfetch';

// semantic-ui react
import {
  Button,
  Card
} from 'semantic-ui-react';


const Home = ({ notes }) => {
  return (
    <div className='notes-container'>
      <h1>Notes</h1>
      <div className='grid wrapper'>
        {
          notes.map(note => {
            return (
              <div key={note._id}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <Link href={`/${note._id}`}>
                        <a>{note.title}</a>
                      </Link>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href={`/${note._id}`}>
                      <Button color="teal">
                        View
                      </Button>
                    </Link>
                    <Link href={`/${note._id}/edit`}>
                      <Button color="teal">
                        Edit
                      </Button>
                    </Link>
                  </Card.Content>
                </Card>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();

  return {
    props: {
      notes: data
    }
  }
}

export default Home;
