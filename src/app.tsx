import './styles/global.css';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  email: z.string().email(),
  dataOfBirth: z.object({
    day: z.string().optional(),
    month: z.string().optional(),
    year: z.string().optional()
  })
})

type formData = z.infer<typeof schema >

export function App() {
  const { handleSubmit, register, formState } = useForm<formData>({
    resolver: zodResolver(schema)
  });

  function onSubmit(data: formData) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-zinc-100">
      <div className='w-full max-w-2xl bg-white shadow rounded-md p-8'>
        <h1 className='text-2xl font-bold text-center'>Cadastro de usuários</h1>
        <form className='flex gap-6 flex-col mt-8' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Primeiro nome</Label>
              <Input type='text' {...register('firstName')}/>
              {formState.errors.firstName?.message && <span className='text-red-500 text-xs'>{formState.errors.firstName?.message}</span>}
            </div>
            <div>
              <Label>Último nome</Label>
              <Input type='text' {...register('lastName')}/>
              {formState.errors.lastName?.message && <span className='text-red-500 text-xs'>{formState.errors.lastName?.message}</span>}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>E-mail</Label>
              <Input type='email' {...register('email')}/>
              {formState.errors.email?.message && <span className='text-red-500 text-xs'>{formState.errors.email?.message}</span>}
            </div>
            <div>
              <Label>Empresa</Label>
              <Input type='text' {...register('company')}/>
              {formState.errors.company?.message && <span className='text-red-500 text-xs'>{formState.errors.company?.message}</span>}
            </div>
          </div>
          <div className='grid grid-cols-3 gap-4 items-end'>
          <div>
              <Label>Data de nascimento</Label>
              <Select {...register('dataOfBirth.day')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Dia" />
                </SelectTrigger>
                <SelectContent>
                {Array(31).fill(1).map((_, index) => {
                    const value = String(index + 1).padStart(2, '0');
                    return(
                      <SelectItem key={String(index)} value={value}>{value}</SelectItem>
                    )})}
                </SelectContent>
              </Select>
              {formState.errors.dataOfBirth?.day?.message && <span className='text-red-500 text-xs'>{formState.errors.dataOfBirth?.day?.message}</span>}
          </div>
          <div>
              <Select {...register('dataOfBirth.month')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  {Array(12).fill(1).map((_, index) => {
                    const value = String(index + 1).padStart(2, '0');
                    return(
                      <SelectItem key={String(index)} value={value}>{value}</SelectItem>
                    )})}
                </SelectContent>
              </Select>
              {formState.errors.dataOfBirth?.month?.message && <span className='text-red-500 text-xs'>{formState.errors.dataOfBirth?.month?.message}</span>}

          </div>
          <div>
              <Select {...register('dataOfBirth.year')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                {Array(124).fill(1).map((_, index) => {
                    const value = String(index + 1901).padStart(4, '0');
                    return(
                      <SelectItem key={String(index)} value={value}>{value}</SelectItem>
                    )})}
                </SelectContent>
              </Select>
              {formState.errors.dataOfBirth?.year?.message && <span className='text-red-500 text-xs'>{formState.errors.dataOfBirth?.year?.message}</span>}

          </div>
          </div>
          <Button className='mt-8' type='submit'>Enviar</Button>
        </form>
      </div>
    </div>
  )
}