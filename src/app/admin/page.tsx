'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { getAssetPath, slugify } from '@/lib/utils';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  image_url: string;
  category_id?: string;
  is_new: boolean;
  installments: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  // Simple Auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'marlucerio2019') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Senha incorreta');
    }
  };

  async function fetchData() {
    setLoading(true);
    const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    const { data: cats } = await supabase.from('categories').select('id, name');
    setProducts(prods || []);
    setCategories(cats || []);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) fetchData();
    else alert('Erro ao excluir');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const productData = {
      title: formData.get('title') as string,
      price: parseFloat(formData.get('price') as string),
      image_url: formData.get('image_url') as string,
      category_id: formData.get('category_id') as string,
      installments: formData.get('installments') as string,
      is_new: formData.get('is_new') === 'on',
      slug: slugify(formData.get('title') as string),
    };

    if (editingProduct?.id) {
       const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
       if (error) alert('Erro ao atualizar: ' + error.message);
    } else {
       const { error } = await supabase.from('products').insert([productData]);
       if (error) alert('Erro ao criar: ' + error.message);
    }

    setEditingProduct(null);
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F2E8DD] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#8B1D5B]/10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#8B1D5B]/10 p-4 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B1D5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h1 className="text-2xl font-bold text-[#8B1D5B] uppercase tracking-widest">Área Admin</h1>
            <p className="text-gray-400 text-xs mt-2 uppercase font-medium">Acesso Restrito - Ateliê Cunha</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Digite a senha"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B1D5B] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button className="w-full bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold py-6 rounded-xl uppercase tracking-widest text-xs">
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="grow py-12 px-4 lg:px-20 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-[#8B1D5B] uppercase tracking-widest">Gestão de Produtos</h1>
          <Button 
            onClick={() => setEditingProduct({})}
            className="bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold px-6 py-4 rounded-lg uppercase tracking-widest text-xs"
          >
            + Novo Produto
          </Button>
        </div>

        {editingProduct && (
          <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-[#8B1D5B]/20">
              <h2 className="text-xl font-bold text-[#8B1D5B] mb-6 uppercase tracking-wider">
                {editingProduct.id ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Título do Produto</label>
                  <input name="title" defaultValue={editingProduct.title} required className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:ring-2 focus:ring-[#8B1D5B] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Preço (Ex: 189.90)</label>
                  <input name="price" type="number" step="0.01" defaultValue={editingProduct.price} required className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:ring-2 focus:ring-[#8B1D5B] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Texto Parcelas (Ex: 10x de R$ 18,99)</label>
                  <input name="installments" defaultValue={editingProduct.installments} required className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:ring-2 focus:ring-[#8B1D5B] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">URL da Imagem</label>
                  <input name="image_url" defaultValue={editingProduct.image_url} required className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:ring-2 focus:ring-[#8B1D5B] outline-none" placeholder="/images/products/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Categoria</label>
                   <select name="category_id" defaultValue={editingProduct.category_id} className="w-full px-4 py-3 rounded-lg border border-gray-100 focus:ring-2 focus:ring-[#8B1D5B] outline-none bg-white">
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                   </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="is_new" defaultChecked={editingProduct.is_new} className="w-4 h-4 accent-[#8B1D5B]" />
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Produto Lançamento?</label>
                </div>
                <div className="col-span-1 md:col-span-2 flex gap-4 pt-4">
                   <Button type="submit" className="grow bg-[#8B1D5B] hover:bg-[#71184a] text-white font-bold py-4 rounded-lg uppercase tracking-widest text-xs">Salvar Alterações</Button>
                   <Button type="button" variant="outline" onClick={() => setEditingProduct(null)} className="grow border-gray-200 text-gray-500 font-bold py-4 rounded-lg uppercase tracking-widest text-xs">Cancelar</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#8B1D5B] text-white uppercase text-[10px] tracking-[0.2em] font-bold">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg bg-gray-50 overflow-hidden border border-gray-100">
                        <Image src={getAssetPath(p.image_url)} alt={p.title} fill className="object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-[#8B1D5B] text-sm group-hover:underline cursor-pointer uppercase">{p.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium tracking-tight">SLUG: {p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold uppercase tracking-tighter">
                      {categories.find(c => c.id === p.category_id)?.name || 'Sem Categoria'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-[#8B1D5B]">
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setEditingProduct(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && (
             <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#8B1D5B]"></div>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
