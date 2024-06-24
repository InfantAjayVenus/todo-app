import Helmet from 'react-helmet';
import { Button } from './components/ui/button';
import { LuCalendar, LuCalendarDays, LuInbox, LuPlus } from 'react-icons/lu';
import { Checkbox } from './components/ui/checkbox';


function App() {

  return (
    <>
      <Helmet>
        <title>todo.</title>
      </Helmet>
      <main className='h-screen w-screen px-4 py-6'>
        <section className='flex flex-col min-h-[90%] lg:pl-[20%]'>
          <header className='pt-2 pb-4'>
            <h3 className='text-2xl font-bold'>Today</h3>
          </header>
          <div className='flex-grow relative border border-current rounded-3xl p-4 lg:h-auto lg:w-[80%] '>
            <ul className='py-6'>
              {(new Array(5).fill(0).map(() => (
                <li className='flex items-center justify-between space-x-2 border-b p-2 mb-2 capitalize'>
                  <p className='text-xl text-ellipsis text-primary-foreground'>test</p>
                  <Checkbox className='h-5 w-5 border-2 font-semibold text-primary-foreground' />
                </li>
              )))}


            </ul>
            <Button variant={'outline'} className='rounded-xl border-current absolute bottom-4 right-4 h-12 w-12 p-1 text-2xl '>
              <LuPlus />
            </Button>
          </div>
        </section>
        <nav className="fixed bottom-0 left-0 p-2 py-2 w-full border-t lg:w-auto lg:h-full lg:border-t-0 lg:border-r">
          <ul className='flex flex-row items-center justify-evenly lg:flex-col'>
            <li>
              <Button variant={'ghost'} className='group flex flex-col justify-center space-y-1 text-xs font-semibold h-20 w-20 rounded-[50%] transition-all hover:-translate-y-2'>
                <LuCalendar className='text-4xl' />
                <p className='text-primary-foreground group-hover:text-current'>Today</p>
              </Button>
            </li>
            <li>
              <Button variant={'ghost'} className='group flex flex-col justify-center space-y-1 text-xs font-semibold h-20 w-20 rounded-[50%] transition-all hover:-translate-y-2'>
                <LuCalendarDays className='text-4xl' />
                <p className='text-primary-foreground group-hover:text-current'>Upcoming</p>
              </Button>
            </li>
            <li>
              <Button variant={'ghost'} className='group flex flex-col justify-center space-y-1 text-xs font-semibold h-20 w-20 rounded-[50%] transition-all hover:-translate-y-2'>
                <LuInbox className='text-4xl' />
                <p className='text-primary-foreground group-hover:text-current'>Inbox</p>
              </Button>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}

export default App;
