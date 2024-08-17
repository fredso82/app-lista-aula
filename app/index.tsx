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

    function undoTarefa(texto: string){
        let newTasks = [...tasks]
        const index = newTasks.findIndex((t) => t.description === texto);
        if (index != -1) {
            newTasks[index].check = false;
            setTasks(newTasks);
        }
    }

    function deleteTarefa(texto: string) {
        setTasks(tasks.filter((t) => t.description !== texto));
    }
        
    useEffect(() => {
        let totalTasks = tasks.length;
        setCountTask(totalTasks);
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
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <CardNumber title="Cadastradas" value={countTask} />
                <CardNumber title="Em aberto" value={countTask} />
                <CardNumber title="Finalizadas" value={0} />
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
                        <View>
                            <Text>Você ainda não cadastrou tarefas!</Text>
                            <Text>Crie uma tarefa para começar</Text>
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