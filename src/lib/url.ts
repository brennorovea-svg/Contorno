// Prefixa caminhos internos com o "base" do Astro.
// No GitHub Pages o site mora em /Contorno/, no domínio próprio mora em /.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (caminho: string) => base + caminho;
