import { StyleSheet } from 'react-native';

export const selectStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', // Centrar verticalmente
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '50%', // Limita la altura si hay muchas opciones
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e6f7ff', // Color de fondo para el item seleccionado
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#007bff',
  },

  root: {
    width: '100%',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 8,
  },
  valueText: {
    fontSize: 14,
    color: '#fafafa',
    fontWeight: '400',
  },
  placeholder: {
    color: '#a1a1aa',
  },
  chevron: {
    color: '#a1a1aa',
    fontSize: 10,
    marginLeft: 8,
  },
  // NUEVO: El overlay ahora ocupa toda la pantalla pero no centra el contenido
  overlay: {
    flex: 1,
    // Quitamos justifyContent: 'center' y alignItems
  },
  content: {
    position: 'absolute', // NUEVO: Posicionamiento absoluto
    backgroundColor: '#09090b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 8,
    paddingVertical: 4,
    maxHeight: 300, // Altura máxima controlada
    // Sombras
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 1000,
  },
  label: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
  itemSelected: {
    backgroundColor: '#27272a',
  },
  checkContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    color: '#fafafa',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    color: '#fafafa',
  },
  itemTextSelected: {
    fontWeight: '500',
  },
});
