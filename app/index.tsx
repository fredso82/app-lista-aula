import { CardNumber } from "@/components/CardNumber";
import { InputAddTask } from "@/components/InputAddTask";
import { Task } from "@/components/Task/index";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
    const [tasks, setTasks] = useState<{ description: string; check: boolean }[]>([]);
    const [taskText, setTaskText] = useState("");
    const [countTasksAbertas, setTasksAbertas] = useState(0);
    const [countTasksFinalizadas, setTasksFinalizadas] = useState(0);
    const [countTask, setCountTask] = useState(0);

    function handleTaskAdd() {
        if (taskText.trim() == "") {
            return Alert.alert("Erro", "Esta tarefa está sem descrição.");
        }

        if (tasks.some((task) => task.description === taskText.trim())) {
            return Alert.alert("Erro", "Tarefa já existe.");
        }

        const newTask = { description: taskText.trim(), check: false };
        setTasks([...tasks, newTask]);
        setTaskText('');
    }

    function completeTarefa(texto: string) {
        let newTasks = [...tasks]
        const index = newTasks.findIndex((t) => t.description === texto);
        if (index != -1) {
            newTasks[index].check = true;
            setTasks(newTasks);
        }
    }

    function updateTasksStatus() {
        const abertas = tasks.filter((t) => !t.check);
        const finalizadas = tasks.filter((t) => t.check);

        setTasksAbertas(abertas ? abertas.length : 0);
        setTasksFinalizadas(finalizadas ? finalizadas.length : 0);
    }

    function undoTarefa(texto: string){
        let newTasks = [...tasks]
        const index = newTasks.findIndex((t) => t.description === texto);
        if (index != -1) {
            newTasks[index].check = false;
            setTasks(newTasks);
        }
    }

    function deleteTarefa(texto: string) {
        Alert.alert("Atenção!", `Deseja realmente remover a tarefa ${texto}?`, [
            {
                text: "Sim",
                onPress: () => {setTasks(tasks.filter((t) => t.description !== texto));}
            },
            {
                text: "Cancelar",
                style: "cancel"
            }
        ]);
        
    }
        
    useEffect(() => {
        let totalTasks = tasks.length;
        setCountTask(totalTasks);
        updateTasksStatus();
    }, [tasks]);

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <StatusBar style="auto" />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder='Digite a tarefa'
                    placeholderTextColor='white'
                    keyboardType='default'
                    onChangeText={setTaskText}
                    value={taskText}
                />
                <TouchableOpacity style={styles.inputButton} onPress={handleTaskAdd}>
                    <Feather name='plus-square' size={24} color='white' />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <CardNumber title="Cadastradas" value={countTask} color="#1E1E1E" />
                <CardNumber title="Em aberto" value={countTasksAbertas} color="#E88A1A" />
                <CardNumber title="Finalizadas" value={countTasksFinalizadas} color="#0E9577" />
            </View>
            <View style={styles.tasks}>
                {tasks.some((t)=>!t.check) && <Text style={{color: 'white'}}>Em aberto:</Text>}
                <FlatList
                    style={styles.listaTarefas}
                    scrollEnabled={true}               
                    data={tasks.filter((t)=>!t.check)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item }) => (
                            <Task 
                                description={item.description} 
                                check={item.check}
                                onComplete={() => completeTarefa(item.description)}
                                onUndo={() => undoTarefa(item.description)}
                                onDelete={() => deleteTarefa(item.description)} />
                        )
                    }
                    ListEmptyComponent={() => (
                        <View style={{marginBottom: 20}}>
                            <Text style={{color: 'white'}}>Você ainda não cadastrou tarefas!</Text>
                            <Text style={{color: 'white'}}>Crie uma tarefa para começar</Text>
                        </View>
                    )}
                />
                {tasks.some((t)=>t.check) && <Text style={{color: 'white'}}>Finalizadas:</Text>}                
                <FlatList
                    style={styles.listaTarefas}
                    scrollEnabled={true}               
                    data={tasks.filter((t)=>t.check)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item }) => (
                            <Task 
                                description={item.description} 
                                check={item.check}
                                onComplete={() => completeTarefa(item.description)}
                                onUndo={() => undoTarefa(item.description)}
                                onDelete={() => deleteTarefa(item.description)} />
                        )
                    }
                   
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#28385E',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        paddingTop: 64,
        gap: 16
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 4,
        backgroundColor: '#252627'
    },
    input: {
        flex: 1,
        padding: 16,
        backgroundColor: '#252624',
        color: 'white'
    },
    inputButton: {
        backgroundColor: '#1E1E1E',
        padding: 16,
        borderRadius: 4
    },
    listaTarefas: {
        padding: 2
    },
    tasks: {
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'column'
    }
})