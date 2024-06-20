import Helmet from 'react-helmet';
import { Button } from './components/ui/button';
import { LuPlus } from 'react-icons/lu';
import { Checkbox } from './components/ui/checkbox';


function App() {

  return (
    <>
      <Helmet>
        <title>todo.</title>
      </Helmet>
      <main className='h-screen w-screen px-4 py-6'>
        <div className='relative border border-current rounded-3xl min-h-[44rem] p-4'>
          <ul className='py-6'>
            {(new Array(5).fill(0).map(() => (
              <li className='flex items-center justify-between border-b p-2 mb-2 capitalize'>
                <p className='text-lg'>test</p>
                <Checkbox className='h-5 w-5' />
              </li>
            )))}


          </ul>
          <Button variant={'outline'} className='rounded-xl border-current absolute bottom-4 right-4 h-12 w-12 p-1 text-2xl '>
            <LuPlus />
          </Button>
        </div>
      </main>
    </>
  );
}

export default App;
