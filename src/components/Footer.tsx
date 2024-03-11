import { Container } from '@/components/Container'

export function Footer() {
  return (
    <footer className="flex-none py-16">
      <Container className="flex items-center justify-center text-base text-slate-500 md:mt-0">
        Copyright &copy; {new Date().getFullYear()} baedarong. All rights
        reserved.
      </Container>
    </footer>
  )
}
