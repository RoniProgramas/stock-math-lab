const Footer = () => {
  return (
    <footer className="border-t bg-card py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            InvestSim - Simulador Educativo de Investimentos
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} - Todos os direitos reservados. Ferramenta educativa para fins didáticos.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
