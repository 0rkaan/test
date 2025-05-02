import { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

/*
Hook personalizado: useConfirmDialog

✅ USO EN ALGÚN COMPONENTE:
1. Importar el hook: const { confirm, ConfirmDialog } = useConfirmDialog();
2. Crear un handler async () =>{} para el evento que necesite confirmación (ej: eliminar un elemento)
3. Llamar dentro del handler a const confirmed = await confirm("Mensaje de pregunta...") en un botón o evento → devuelve true o false según lo que confirme el usuario
-. y maneja la acción dentro de un if (confirmed) {...}
4. En el botón invoca el handler (ej: onClick={handleClick})
5. Renderizar <ConfirmDialog /> al final del componente para mostrar el popup

Ejemplo:

  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleClick = async () => {
    const confirmed = await confirm("¿Estás seguro?");
    if (confirmed) {
      // Acción real
    }
  };

  return (
    <>
      <button onClick={handleClick}>Eliminar</button>
      <ConfirmDialog />
    </>
  );

*/

export function useConfirmDialog() {
  const [promise, setPromise] = useState(null);

  const ConfirmDialog = useCallback(() => {
    if (!promise) return null;

    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Estás seguro?</h3>
          <p className="text-sm text-gray-600 mb-6">{promise.message || "Esta acción no se puede deshacer."}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                promise.resolve(false);
                setPromise(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                promise.resolve(true);
                setPromise(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }, [promise]);

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      setPromise({ resolve, message });
    });
  }, []);

  return { ConfirmDialog, confirm };
}
